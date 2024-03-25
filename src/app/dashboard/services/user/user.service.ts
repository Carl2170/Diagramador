import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = `${environment.apiUrl}:${environment.port}`;
   }

   getUser(){
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get(`${this.apiURL}/users/get`,  { headers })
  }

  updateUser(userData: {name: string, lastname: string, email:string}){
    const authToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.patch(`${this.apiURL}/users/update-user`, userData, { headers })

  }
}
