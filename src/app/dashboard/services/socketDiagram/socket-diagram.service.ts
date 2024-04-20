import { EventEmitter,Injectable ,Output} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Subject,fromEvent,Observable   } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketDiagramService extends Socket{

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  public callback:EventEmitter<any> = new EventEmitter();

  private addBoundary = new Subject<any>();

  constructor() {
    super({
      //BACKEND
      url:`${environment.apiSocket}`,
    });
    this.listen(); 
   }

   private listen = () => {
    this.ioSocket.on('event', (res: any) => this.callback.emit(res));   
    this.ioSocket.on('add-boundary1', (res: any) => this.addBoundary.next(res));

   }

   emitEvent = (payload = {}) => {
    this.ioSocket.emit('event', payload)
  }

  emitAddBoundary(roomId:any, nameUser: any){
    this.ioSocket.emit('add-boundary',{roomId:roomId, nameUser:nameUser});
  }

  //RECEPCION
  answerAddBoundary():Observable<any>{
    return this.addBoundary.asObservable();
  }

}
