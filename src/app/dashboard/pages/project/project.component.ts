import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { ProjectService } from '../../services/project/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  registers :any;

  errorMessage: string | null = null;

  get name(){return this.formProject.get('name') as FormControl}
  
  
    setName(value: string) {
    this.formProject.get('name')?.setValue(value);
    }
  
  formProject = new FormGroup({
    'name': new FormControl('',Validators.required)
  });

  constructor(private router:Router, private projectService: ProjectService ){}

  isFormValid(): boolean {
    return this.formProject.valid
  }

  onSubmit(){
    if (this.isFormValid()) {
      const formData = {
        name: this.name.value,
      }
      this.projectService.create(formData).subscribe(
        (res)=>{
          console.log('Backend response: ', res);
          Swal.fire({
            title:"Projecto creado",
            icon:"success"
          })
          this.setName("");
          this.getRooms();
        },
        (error)=>{
          if('status' in error){
            if(error.status==500){
              console.log(error);
            }else{
              console.log('Error: ', error.message);
            }
          }
        }
      );
    } else{
      this.formProject.markAllAsTouched();
    }
  }
  
  ngOnInit(){
   this.getRooms();
  }

  getRooms(){
    this.projectService.getRooms().subscribe(
      (res)=>{
        this.registers=res
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  deleteRoom(id:any){
    Swal.fire({
      title:'¿Desear eliminar?',
      text:'¿Estás seguro de eliminar la sala?',
      icon:'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.projectService.deleteRoom(id).subscribe(
          (res)=>{
            Swal.fire("Eliminado", "", "success");
            this.getRooms();

          },(error)=>{
            console.log(error);
            
          }
        )
      }
    })
    
  }
  private showImageQuantityFreeAlert(){
    Swal.fire({
      title: '¡Renders Gratuitos Agotados!',
      text: 'Agotaste la cantidad de Renders gratuitos, por favor adquiere uno de nuestros planes',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Ver Planes'
    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigate(['/billing'])
      }
    })
  }
}
