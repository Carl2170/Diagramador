import { Component, inject } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  
  data:any;
  private fb: FormBuilder = inject(FormBuilder);

  get name(){
    return this.formProfile.get('name') as FormControl;
  }

  get lastname(){
    return this.formProfile.get('lastname') as FormControl;
  }


  get email(){return this.formProfile.get('email') as FormControl}


  public formProfile : FormGroup = this.fb.group({
    name:  ["", Validators.required],
    lastname: ["", Validators.required],
    email: ["", Validators.required],
    imageProfile: [""],

  })
  
  constructor(private userService:UserService){}


  ngOnInit(){
    this.getUser();
   }

   getUser(){
    this.userService.getUser().subscribe(
      (res:any)=>{
        this.formProfile.patchValue({
        name:res[0].name,
        lastname:res[0].lastname,
        email:res[0].email
        });  
      },
      (error)=>{
        console.log(error);
      }
    )
   }

   isFormValid(): boolean {
    return this.formProfile.valid
  }

  formularioEdit(): boolean {
    return this.formProfile.dirty;
  }

   toUpdateData(){
    if (this.isFormValid()) {
      const formData = {
        name: this.name.value,
        lastname: this.lastname.value,
        email: this.email.value
      }
      Swal.fire({
        title:'Actualizar datos?',
        text:'¿Estás seguro de actualizar los datos?',
        icon:'warning',
        showCancelButton: true,
        confirmButtonText: 'Actualizar'
      }).then((result)=>{
        if(result.isConfirmed){
          this.userService.updateUser(formData).subscribe(
            (res)=>{
              Swal.fire("Perfil Actualizado", "", "success");
              this.getUser();
  
            },(error)=>{
              console.log(error);
              
            }
          )
        }
      })
    }else{
      this.formProfile.markAllAsTouched();
    }
   }
}
