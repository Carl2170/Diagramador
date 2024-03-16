import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  errorMessage: string | null = null;

  get email(){return this.formLogin.get('email') as FormControl}

  get password(){return this.formLogin.get('password') as FormControl}

  formLogin = new FormGroup({
    'email': new FormControl('',[Validators.required, Validators.email]),
    'password': new FormControl('',Validators.required)
  });

  constructor( private router: Router,
               private authService: AuthService){}
  
  toRegister(){
    this.router.navigate(['auth/register']);
  }

  async onSubmit(){
    try {
      const response = await this.authService.login(this.formLogin.value);
      localStorage.setItem('token', response.token);
      await this.router.navigate(['home']);

    } catch (error) {
     this.showMessageError('Email o contraseña incorrecta') 
    }
  }

  showMessageError(mensaje: string) {
    this.errorMessage = mensaje;
    setTimeout(() => {
      this.errorMessage = null;
    }, 7000);
  }
}
