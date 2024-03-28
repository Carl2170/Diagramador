import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private readonly apiURL: string;
  
  constructor(private http: HttpClient) {
    this.apiURL = `${environment.apiUrl}:${environment.port}`;
   }
}
