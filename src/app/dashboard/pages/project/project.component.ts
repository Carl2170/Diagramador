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
  roomsCollaborate:any;
  roomsToCollaborate :boolean= false;
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
   this.getRoomsToCollaborate();
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
            this.getRoomsToCollaborate();
          },(error)=>{
            console.log(error);
            
          }
        )
      }
    })
    
  }

  toRoom(nameProject:any){
    localStorage.setItem('room', nameProject);
    this.router.navigate(['/room',nameProject])
  }

  async toAddCollaborators(){
    Swal.fire({
  title: "Invitación",
  text:"Escriba el email del colaborador",
  input: "text",
  inputAttributes: {
    autocapitalize: "off"
  },
  showCancelButton: true,
  confirmButtonText: "Enviar invitación",
  showLoaderOnConfirm: true,
  preConfirm: async (invitation) => {
    try {
      this.projectService.getCollaborator(invitation).subscribe(
      (res)=>{
        Swal.fire({
          title: 'Se ha enviado invitación a: <b>'+ invitation+ '<b>',        
          icon:"success"
        });
      },(error)=>{
      console.log(error);
        Swal.fire({
          title: ` no existe el usuario o error en el nombre`, 
          icon:"info"
        });
      }
     )
  
    } catch (error) {
      Swal.showValidationMessage(`
       Ocurrió un error: ${error}
      `);
    }
  },
})
  }


  getRoomsToCollaborate(){
    this.projectService.getRoomCollaborate().subscribe(
      (res)=>{
        this.roomsCollaborate=res
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  showInvitationProcessingAlert() {
    Swal.fire({
      title: 'Cargando...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          Swal.close();
        }, 3000); // Mostrar durante 3 segundos
      }
    });
}

}