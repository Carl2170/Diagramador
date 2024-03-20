import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocketWebService } from '../../services/socketIO/socket-web.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit{
  room: string | null='';// Inicializado con un valor predeterminado de null
 
  constructor( private router:ActivatedRoute, 
               private cookie: CookieService,
               private socketWebService: SocketWebService)
               {
          
               }
  ngOnInit(){
 
      this.room= this.router.snapshot.paramMap.get('room')??'jj';
      this.cookie.set('room',this.room)

      this.socketWebService.outEven.subscribe(res => {
        console.log(res);
      })

  }
}
