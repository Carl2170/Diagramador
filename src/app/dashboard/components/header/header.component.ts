import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  name: string | null = null;
  constructor (private router:Router, private userService:UserService){
  }
  
  ngOnInit(){
    this.name = localStorage.getItem('name')
  }
  toHome(){
    this.router.navigate(['/home']);
  }
  toProfile(){
    this.router.navigate(['/profile']);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['auth/login']);
  }
}
