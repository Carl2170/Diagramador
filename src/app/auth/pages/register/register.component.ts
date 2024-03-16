import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  errorMessage: string | null = null;

  get name(){
    return this.formRegister.get('name') as FormControl;
  }

  get lastname(){
    return this.formRegister.get('lastname') as FormControl;
  }


  get email(){return this.formRegister.get('email') as FormControl}

  get password(){return this.formRegister.get('password') as FormControl}

  formRegister = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).*$/)
    ])
   })
  constructor( private router: Router,
               private authService: AuthService){}
 
  toLogin(){
    this.router.navigate(['auth/login']);
  }

  isFormValid(): boolean {
    return this.formRegister.valid
  }

  onSubmit(){
    if (this.isFormValid()) {
      const formData = {
        name: this.name.value,
        lastname: this.lastname.value,
        email: this.email.value,
        password: this.password.value
      }
      this.authService.postRegister(formData).subscribe(
        (res)=>{
          console.log('Backend response: ', res);
          if( 'message' in res){
              console.log(res.message);
              this.router.navigate(['auth/login']);        
          }
          // this.sweetAlert.sweetAlert2(
          //   'Cuenta creada',
          //   'Se ha creado correctamente la cuenta',
          //   'success',
          //   false,
          //   false
          // )
        },
        (error)=>{
          if('status' in error){
            if(error.status==400){
              console.log('email already exists');
              this.showMessageError('Ya existe una cuenta asociada con este email') 

            }else{
              console.log('Error: ', error.message);
            }
          }
        }
      );
    } else{
      this.formRegister.markAllAsTouched();
    }
  }

  showMessageError(msj: string) {
    this.errorMessage = msj;
    setTimeout(() => {
      this.errorMessage = null;
    }, 7000);
  }
}
