import { EventEmitter,Injectable ,Output} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Subject,fromEvent,Observable   } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
 export class SocketWebService extends Socket{

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  public callback:EventEmitter<any> = new EventEmitter();

  private usersConected = new Subject<any>();
  private messageUsersConnected = new Subject<any>();
  private messageUsersDesconnected = new Subject<any>();


  nameRoom:string | null ="";
  nameUser:string | null ="";
  message:string ="";
  arrayUser:string[]=[];
  userId:any

  constructor() { 
    super({
      //BACKEND
      url:`${environment.apiSocket}`,
    });
  this.listen(); 
  }

  private listen = () => {
     this.ioSocket.on('event', (res: any) => this.callback.emit(res));
     this.ioSocket.on('table-user-actualice', (res: any) => this.usersConected.next(res));
     this.ioSocket.on('user-connected', (res: any) => this.messageUsersConnected.next(res));
     this.ioSocket.on('user-desconnected', (res: any) => this.messageUsersDesconnected.next(res));

    }
    emitEvent = (payload = {}) => {
    this.ioSocket.emit('event', payload)
  }

  roomStarted(user_id:any, roomId: any, nameProject: any) {  
    this.nameUser =  localStorage.getItem('name')
    this.ioSocket.emit('room-started', { userId:user_id ,nameUser:this.nameUser, roomId:roomId, nameRoom: nameProject });
  
    this.ioSocket.on('room-started', (response: string) => {
      console.log(response);
    });

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

 

  //FUNCIONES DE EMISION
  disconnectSocket(userName: any, idRoom: any) {
    this.ioSocket.emit('user-desconnect', { nameUser:userName,roomId:idRoom });
  }

}
