import { EventEmitter,Injectable ,Output} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket{

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  callback:EventEmitter<any> = new EventEmitter();
  constructor(private cookie:CookieService) { 
    
    super({
      //BACKEND
      url:'http://localhost:5000',
      options:{
        query:{
          nameRoom:cookie.get('room')
        }
      }
    });
  //  this.initSocketListeners();
  this.listen();

  }

   listen = () => {
     this.ioSocket.on('event', (res: any) => this.callback.emit(res));   
   }
  emitEvent = (payload = {}) => {
    this.ioSocket.emit('event', payload)

  }


  // private initSocketListeners(): void {
  //   this.on('connect', () => {
  //     this.connectionStatusSubject.next('Connected to Socket.IO server');
  //   });

  //   this.on('disconnect', () => {
  //     this.connectionStatusSubject.next('Disconnected from Socket.IO server');
  //   });

  //   // Puedes agregar más eventos según tus necesidades
  

}
