import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fabric } from 'fabric';
import {ObjectComp} from '../../../../../classes/objectComp';
import Swal from 'sweetalert2';
import { ComponentsService } from '../../../services/fabricJS/components.service';

@Component({
  selector: 'app-godiagram',
  templateUrl: './godiagram.component.html',
  styleUrls: ['./godiagram.component.scss'],
})
export class GodiagramComponent implements AfterViewInit {
  @ViewChild('diagramCanvas', { static: true }) private diagramCanvasRef!: ElementRef;

  private diagramCanvas: any;
  private startPoint: fabric.Point | null = null; // Punto inicial de la línea
  private isDrawingLine = false; // Bandera para indicar si estás dibujando una nueva línea
  private endPoint:any; // Punto inicial de la línea

  line:any;
  arrowHead:any;
  typeLine:any;
  lineF:any;

  //ESTRUCTURA DE DATOS 
  arrayDistanceLeftComponents:any= [];
  leftObject:any;
  obj:any;
  arrayElements:any=[];
  images= [
    { name: 'Actor', src: 'assets/components/actor.png' },
    { name: 'Limite', src: 'assets/components/limite.png' },
    { name: 'Control', src: 'assets/components/control.png' },
    { name: 'Entidad', src: 'assets/components/entidad.png' },
    { name: 'Objeto', src: 'assets/components/objecto.png' }
  ]

  constructor(private fabricService:ComponentsService){}

  ngAfterViewInit(): void {
    this.initializeCanvas(); 
  }

  private initializeCanvas(): void {    
    this.diagramCanvas = new fabric.Canvas(this.diagramCanvasRef.nativeElement, {
      backgroundColor: '#f0f0f0',
      width: 1000,
      height: 600
    });

  // Manejador de eventos para mover objetos en el lienzo
  this.diagramCanvas.on('object:moving', (e: any) => {
    this.handleObjectMoving(e.target);
  });

  // Manejador de eventos para dibujar una línea cuando se hace clic en el lienzo
  this.diagramCanvas.on('mouse:down', (event: any) => {
    this.handleMouseDown(event);
  });

  // Manejador de eventos para finalizar la línea cuando se suelta el clic del ratón
  this.diagramCanvas.on('mouse:up', async (event: any) => {
    await this.handleMouseUp(event);
  });
  
  }

  async addObject(url:string){
    if(this.arrayDistanceLeftComponents.length ==0){
      this.leftObject = 50;
    }else{
   this.leftObject = this.arrayDistanceLeftComponents[this.arrayDistanceLeftComponents.length-1] + 150;
    }

    const img = await this.fabricService.createImage(url,this.leftObject,50);
    
    this.arrayDistanceLeftComponents.push(this.leftObject) // Hacer que la imagen no sea seleccionable
    this.obj= new ObjectComp(this.arrayElements.length+1,url,50, this.leftObject)
    this.arrayElements.push(this.obj)
    this.diagramCanvas.add(img)

    img.setCoords();

    const imgTop = img.top || 0; 
    const imgHeight = img.height || 0; 

    const lifeLine= await this.fabricService.lineLife(this.leftObject, imgTop, imgHeight);
    this.diagramCanvas.add(lifeLine); 

    const chartLife= await this.fabricService.chartLife(this.leftObject+27,150,100);
    this.diagramCanvas.add(chartLife);

    this.diagramCanvas.on('object:moving', (e: any) => {
      if (e.target === img) {
        this.handleObjectImgMoving(e, img, lifeLine);
      }
    });
  }
  
  startDrawing(): void {
  this.isDrawingLine = true;  
  }

  async modalTypeMessage(line:fabric.Line){
  try {
    Swal.fire({
      title: 'Selecciona una opción de mensaje',
      input: 'select',
      inputOptions: {
          'sincrono': 'Mensaje Síncrono',
          'asincrono': 'Mensaje Asíncrono',
          'respuesta': 'Respuesta'
      },
      inputPlaceholder: 'Selecciona una opción',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
  }).then(async (result) => {
      if (result.isConfirmed) {
          const selectedOption = result.value;
          if (selectedOption) {
             this.typeLine= selectedOption;
             const lineMessage = await this.fabricService.typeLineMessage(this.typeLine,line,this.endPoint.x,this.endPoint.y);      
             lineMessage.setCoords();
             this.diagramCanvas.add(lineMessage);
            } else {
            console.log("no has seleccionado nada");
          }
      }
  });
    
  } catch (error) {
    console.log(error);
    
  }
  }

//EVENTOS
// Función para manejar el movimiento de un objeto en el lienzo
private handleObjectMoving(target: any): void {
  if (target === this.line) {
    const length = this.fabricService.calculateLineLength(this.line);
    this.arrowHead.set({
      left: length + this.line.left - 6,
      top: this.line.top - 3,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });
    this.arrowHead.setCoords();
  }
}

// Función para manejar el evento de clic del ratón en el lienzo
private handleMouseDown(event: any): void {
  if (this.isDrawingLine) {
    const mouseEvent = event.e;
    const canvasCoords = this.diagramCanvas.getPointer(mouseEvent);
    this.startPoint = new fabric.Point(canvasCoords.x, canvasCoords.y);
  }
}

// Función para manejar el evento de liberación del ratón en el lienzo
private async handleMouseUp(event: any): Promise<void> {
  try {
    if (this.startPoint) {
      const mouseEvent = event.e;
      const canvasCoords = this.diagramCanvas.getPointer(mouseEvent);
      this.endPoint = new fabric.Point(canvasCoords.x, this.startPoint.y);
      
      // Dibujar la línea con el punto inicial y el punto final
      this.line = new fabric.Line([this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y], {
        stroke: 'black',
        strokeWidth: 2,
        lockMovementX: false,
        hasControls: false,
        hasBorders: false 
      });

      await this.modalTypeMessage(this.line);      
      this.isDrawingLine = false;
             
      // Limpiar el punto inicial para el próximo dibujo
      this.startPoint = null;
    }
  } catch (error) {
    console.log(error);
  }
}

//Funcion para manejar el evento de mover la imagen del objeto o clase o controlador
handleObjectImgMoving(event: any, img: any, lifeLine: any): void {
  if (event.target === img) {
    const leftImg = img.left || 0;
    lifeLine.set({
      left: leftImg + 35,
      top: 120,
      selectable: true,
      hasControls: true,
      hasBorders: true,
      lockUniScaling: true,
      lockScalingX: true,
      lockScalingY: true,
      lockMovementY: true 
    });
    lifeLine.setCoords();
  }
}
}
