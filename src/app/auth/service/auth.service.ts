import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiURL: string;


  constructor(private http: HttpClient) { 
    this.apiURL = `${environment.apiUrl}:${environment.port}`;
  }
  login(formValue:any){
    return firstValueFrom(
      this.http.post<any>(`${this.apiURL}/users/login`, formValue)
    );    
  }
  
  postRegister(userData: {name: string, lastname: string, email:string, password: string}){
    return this.http.post(`${this.apiURL}/users/register`, userData)
  }

}
