import { EventEmitter,Injectable ,Output} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
 import { Socket } from 'ngx-socket-io';
//import { io, Socket } from 'socket.io-client';
//import { io } from "socket.io-client";
//import * as io from 'socket.io-client';


import { map } from 'rxjs/operators';
import { Subject,fromEvent,Observable   } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
 export class SocketWebService extends Socket{
  //export class SocketWebService {

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  public callback:EventEmitter<any> = new EventEmitter();

  private session= new Subject<any>();
  private usersConected = new Subject<any>();
  private messageUsersConnected = new Subject<any>();
  private messageUsersDesconnected = new Subject<any>();
  private addBoundary = new Subject<any>();


  nameRoom:string | null ="";
  nameUser:string | null ="";
  message:string ="";
  arrayUser:string[]=[];
  userId:any

  private tokenUser: any 

  constructor() { 
    super({
      //BACKEND
      url:`${environment.apiSocket}`,
      options:{
        autoConnect:false,
       // auth:this.tokenUser
      }
    });
 // this.listen();
    this.connectSocket()
  }


  private listen = () => {
     this.ioSocket.on('event', (res: any) => this.callback.emit(res));

   

     this.ioSocket.on('table-user-actualice', (res: any) => this.usersConected.next(res));
     this.ioSocket.on('user-connected', (res: any) => this.messageUsersConnected.next(res));
     this.ioSocket.on('user-desconnected', (res: any) => this.messageUsersDesconnected.next(res));


     //this.ioSocket.on('add-boundary', (res: any) => this.addBoundary.next(res));

    }

  async connectSocket(){
    try {
      const sessionID = localStorage.getItem("sessionID");
      if(sessionID){
        console.log('cliente: ya hay una sesionID');
        
        this.ioSocket.auth = { sessionID };
        this.ioSocket.connect();
      }else{
        console.log('cliente: no hay una sesionID');

      await this.onUsername();
      await this.ioSocket.connect();
      await this.userConected();
      }
     
    } catch (error) {
      console.log(error);
    }
  }

  async onUsername(){
    try {
      this.tokenUser= localStorage.getItem('token')
      var username= localStorage.getItem('name')

      this.ioSocket.auth= {username };
      this.ioSocket.sessionID= this.tokenUser

    } catch (error) {
      console.log(error);
      
    }
  }

  async userConected(){
    try {
      this.ioSocket.on("session", (res:any) => {
        const { sessionID, userID } = res
        this.ioSocket.auth = { sessionID };
        localStorage.setItem("sessionID", sessionID);
        this.ioSocket.userID = userID
        console.log(sessionID);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async receive(event: string, callback: (...args: any[]) => void) {
    try {
      this.ioSocket.on(event, callback);
    } catch (error) {
      console.log(error);
    }
  }

  async send(event: string, data?: any) {
    try {
      this.ioSocket.emit(event, data);
    } catch (error) {
      console.log(error);
      
    }
  }


  roomStarted(user_id:any, roomId: any, nameProject: any) {  
    this.nameUser =  localStorage.getItem('name')
    this.ioSocket.emit('room-started', { userId:user_id ,nameUser:this.nameUser, roomId:roomId, nameRoom: nameProject });
  
    // this.ioSocket.on('room-started', (response: string) => {
    // });

  }

  roomClosed(){
    localStorage.removeItem('room');
    localStorage.removeItem('nameRoom');
    this.nameUser =localStorage.getItem('name')
     let idR = localStorage.getItem('idRoom');
     localStorage.removeItem('idRoom');
     if(idR !== null){
       const idRoom= parseInt(idR);
       this.disconnectSocket(this.nameUser,idRoom);
     }
  }

  //FUNCIONES DE RECEPCION
  getUsersConectedObservable():Observable<any>{
    return this.usersConected.asObservable();
  }

  getMessageUserConnected():Observable<any>{
    return this.messageUsersConnected.asObservable();
  }

  getMessageUserDesconnected():Observable<any>{
    return this.messageUsersDesconnected.asObservable();
  }

  // answerAddBoundary():Observable<any>{
  //   return this.addBoundary.asObservable();
  // }

 

  //FUNCIONES DE EMISION
  async disconnectSocket(userName: any, idRoom: any) {
    try {      
      await this.ioSocket.emit('user-desconnect', { nameUser:userName,roomId:idRoom });
      //  this.ioSocket.on('user-desconnect', (res:any)=>{
      //  console.log("se desconectó: "+res.nameUser);
      // })
    } catch (error) {
      console.log(error);
      
    }
  }

}
