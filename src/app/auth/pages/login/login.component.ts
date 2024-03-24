import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Token  } from '../../guards/types';

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

  isFormValid(): boolean {
    return this.formLogin.valid
  }
  
   onSubmit(){
   if(this.isFormValid()){
    const formData = {
      email: this.email.value,
      password: this.password.value
    }
    this.authService.login(formData).subscribe(
      (res: any) => {
        if ('token' in res) {
          localStorage.setItem('token', res.token);      
          this.router.navigate(['home']);        
          
        }
      },
      (error)=>{
        this.errorMessage = 'Datos incorrectos'
        console.log(error);
        
      }
    );
  } else{
    this.formLogin.markAllAsTouched();
  }
   }

}
