import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = `${environment.apiUrl}:${environment.port}`;
   }

   create(data: {name: string}){
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.post(`${this.apiURL}/room/create`, data,  { headers })
  }

  getRooms(){
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get(`${this.apiURL}/room/get-rooms`,  { headers })
  }

  deleteRoom(id:any){
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.delete(`${this.apiURL}/room/delete-room/${id}`,  { headers })

  }
}
