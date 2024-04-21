import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketWebService } from '../../services/socketIO/socket-web.service';
import { SocketDiagramService } from '../../services/socketDiagram/socket-diagram.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit{
  roomName: string | null='';
  arrayUser:any;
  idUser:any;
  idRoom:any;
  nameUser:any;

  username:any

  constructor( private route: Router,
               private socketWebService: SocketWebService,
              )
               {
               }
               
  async ngOnInit(){
    try {

      // this.socketWebService.getUsersConectedObservable().subscribe((res: any) => {
      //   this.arrayUser = res;
      // });

    await  this.socketWebService.receive('table-user-actualice',(data:any)=>{
        this.arrayUser = data;
      })

      // this.socketWebService.getMessageUserConnected().subscribe((res: any) => {
      //   this.nameUser= localStorage.getItem('name');
      //   if(this.nameUser !== null){
      //     if(this.nameUser == res.nameUser){
      //       this.notiToaster("Has ","info","ingresado a la sala.");
      //     }else{
      //       this.notiToaster(res.nameUser,"info"," ha ingresado a la sala.");
      //     }
      //   }
      // });
      
    await  this.socketWebService.receive('user-connected', (data:any)=>{
        this.nameUser= localStorage.getItem('name');
          if(this.nameUser !== null){
            if(this.nameUser == data.nameUser){
              this.notiToaster("Has ","info","ingresado a la sala.");
            }else{
              this.notiToaster(data.nameUser,"info"," ha ingresado a la sala.");
            }
          }
      })

      // this.socketWebService.getMessageUserDesconnected().subscribe((res: any) => {
      //   this.nameUser= localStorage.getItem('name');
      //   if(this.nameUser !== null){
      //     if(this.nameUser == res.nameUser){
      //       this.notiToaster("Has ","info","salido de la sala.");
      //     }else{
      //       this.notiToaster(res.nameUser,"info"," ha salido de la sala.");
      //     }
      //   }
      // });

       await this.socketWebService.receive('user-desconnected',(res:any)=>{
        this.nameUser= localStorage.getItem('name');
        if(this.nameUser !== null){
          if(this.nameUser == res.nameUser){
            this.notiToaster("Has ","info","salido de la sala.");
          }else{
            this.notiToaster(res.nameUser,"info"," ha salido de la sala.");
          }
        }
      })

      this.roomName = localStorage.getItem('nameRoom');
      const local_id= localStorage.getItem('idUser');
      const local_idRoom= localStorage.getItem('idRoom')

    if(local_id != null && local_idRoom != null ){
      this.idRoom= parseInt(local_idRoom);
      this.idUser= parseInt(local_id);     
     // this.socketWebService.roomStarted(this.idUser,this.idRoom, this.roomName)
     await this.socketWebService.send('room-started', { userId:this.idUser ,nameUser:this.nameUser, roomId:this.idRoom})
    }

  
   
    } catch (error) {
      console.log(error);
    }
  }

  closeRoom(){
    Swal.fire({
      title: "¿Estás seguro de salir de la sala?",
      icon:"warning",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Abandonar sala",
      denyButtonText: `Cerrar sala`,
      cancelButtonText:'Cancelar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.socketWebService.roomClosed();
        localStorage.removeItem('sessionID');
        this.route.navigate(['/home']);
      } else if (result.isDenied) {
        Swal.fire({
          title: "¿Estás seguro de cerrar de la sala?",
          text:"Todos los usuarios serán retirados de la sala",
          icon:"warning",
          showDenyButton: true,
          showCancelButton: true,
          showConfirmButton:false,
          denyButtonText: `Cerrar sala`,
          cancelButtonText:'Cancelar'
        }).then((result) => {
          if (result.isDenied) {
            this.socketWebService.roomClosed();
            localStorage.removeItem('sessionID');
                this.route.navigate(['/home']);
          }
        })
      }
    });
  }

  notiToaster(nameUser:any, icono: any, message:any){
  const Toast= Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: icono,
      title: nameUser +" "+message
    });
  }
}


