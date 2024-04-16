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
  @ViewChild('diagramOptions', { static: true }) private diagramOptionsRef!: ElementRef;

  private diagramCanvas: any;
  private diagramOptions: any;

  private startPoint: fabric.Point | null = null; // Punto inicial de la línea
  private isDrawingLine = false; // Bandera para indicar si estás dibujando una nueva línea
  private endPoint:any; // Punto inicial de la línea

  line:any;
  arrowHead:any;
  typeLine:any;
  lineF:any;
  condition: any;

  //ESTRUCTURA DE DATOS 
  arrayDistanceLeftComponents:any= [];
  leftObject:any;
  obj:any;
  objSequence:any;
  arrayElements:any=[];
  images= [
    { name: 'Actor', src: 'assets/component/actor.png' },
    { name: 'Limite', src: 'assets/component/boundary.png' },
    { name: 'Control', src: 'assets/component/control.png' },
    { name: 'Entidad', src: 'assets/component/entidad.png' },
    { name: 'Objeto', src: 'assets/component/lifeline.png' }
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

  document.addEventListener('keydown',(event)=>{
    if (event.code === 'Delete') {
      const selectedObjects = this.diagramCanvas.getActiveObjects();
      selectedObjects.forEach((obj: fabric.Group )=> {
          this.diagramCanvas.remove(obj);
      });
      this.diagramCanvas.discardActiveObject().renderAll();
  }
  })
  }

  async addActor(url: string){
    this.leftObject= this.getArrayDistanceLeftComponents();
//    const actor= await this.fabricService.toActor(url,this.leftObject,20);
    const actor= await this.fabricService.toA(this.leftObject,20);

    actor.scaleToWidth(35);
    actor.setCoords();

    this.arrayDistanceLeftComponents.push(this.leftObject) // Hacer que la imagen no sea seleccionable
    const obj= new ObjectComp(this.arrayElements.length+1,'actor',50, this.leftObject);
    this.arrayElements.push(obj);
    this.diagramCanvas.add(actor);

    //linea de vida
    const imgTop = actor.top || 0; 
    const imgHeight = actor.height || 0; 

    const lifeLine= await this.fabricService.lineLife(this.leftObject-20, imgTop, imgHeight);
    this.diagramCanvas.add(lifeLine); 


    this.diagramCanvas.on('object:moving', (e: any) => {
      if (e.target === actor) {
        this.handleObjectImgMoving(e, actor, lifeLine);
      }
    });
  }

  async addBoundary(){

    this.leftObject= this.getArrayDistanceLeftComponents();

    const boundary= await this.fabricService.toBoundary(this.leftObject,20);
    boundary.scaleToWidth(70);
    boundary.setCoords();

    this.arrayDistanceLeftComponents.push(this.leftObject) // Hacer que la imagen no sea seleccionable
    const obj= new ObjectComp(this.arrayElements.length+1,'boundary',50, this.leftObject);
    this.arrayElements.push(obj);
    this.diagramCanvas.add(boundary);

    //linea de vida
    const imgTop = boundary.top || 0; 
    const imgHeight = boundary.height || 0; 

    const lifeLine= await this.fabricService.lineLife(this.leftObject, imgTop, imgHeight);
    this.diagramCanvas.add(lifeLine); 


    this.diagramCanvas.on('object:moving', (e: any) => {
      if (e.target === boundary) {
        this.handleObjectImgMoving(e, boundary, lifeLine);
      }
    });
 
  }

  async addControl(){
    this.leftObject= this.getArrayDistanceLeftComponents();

    const control= await this.fabricService.toControl(this.leftObject,20);
    control.scaleToWidth(60);
    control.setCoords();

    this.arrayDistanceLeftComponents.push(this.leftObject)
    const obj= new ObjectComp(this.arrayElements.length+1,'control',50, this.leftObject);
    this.arrayElements.push(obj);
    this.diagramCanvas.add(control);

    //linea de vida
    const imgTop = control.top || 0; 
    const imgHeight = control.height || 0; 

    const lifeLine= await this.fabricService.lineLife(this.leftObject, imgTop, imgHeight);
    this.diagramCanvas.add(lifeLine); 


    this.diagramCanvas.on('object:moving', (e: any) => {
      if (e.target === control) {
        this.handleObjectImgMoving(e, control, lifeLine);
      }
    });
  }

  async addEntity(){
    this.leftObject= this.getArrayDistanceLeftComponents();

    const entidad= await this.fabricService.toEntity(this.leftObject,20);
    entidad.scaleToWidth(60);
    entidad.setCoords();

    this.arrayDistanceLeftComponents.push(this.leftObject)
    const obj= new ObjectComp(this.arrayElements.length+1,'entidad',50, this.leftObject);
    this.arrayElements.push(obj);
    this.diagramCanvas.add(entidad);

    //linea de vida
    const imgTop = entidad.top || 0; 
    const imgHeight = entidad.height || 0; 

    const lifeLine= await this.fabricService.lineLife(this.leftObject, imgTop, imgHeight);
    this.diagramCanvas.add(lifeLine); 


    this.diagramCanvas.on('object:moving', (e: any) => {
      if (e.target === entidad) {
        this.handleObjectImgMoving(e, entidad, lifeLine);
      }
    });
  }

  async addObjectRec(){
    this.leftObject= this.getArrayDistanceLeftComponents();

    const object= await this.fabricService.toObject(this.leftObject,20);
    object.scaleToWidth(80);
    object.setCoords();

    this.arrayDistanceLeftComponents.push(this.leftObject)
    const obj= new ObjectComp(this.arrayElements.length+1,'objeto',50, this.leftObject);
    this.arrayElements.push(obj);
    this.diagramCanvas.add(object);

    //linea de vida
    const imgTop = object.top || 0; 
    const imgHeight = object.height || 0; 

    const lifeLine= await this.fabricService.lineLife(this.leftObject, imgTop, imgHeight);
    this.diagramCanvas.add(lifeLine); 


    this.diagramCanvas.on('object:moving', (e: any) => {
      if (e.target === object) {
        this.handleObjectImgMoving(e, object, lifeLine);
      }
    });
  }

   getArrayDistanceLeftComponents(){
    
    if(this.arrayDistanceLeftComponents.length ==0){
      return 50; 
    }
   return  (this.arrayDistanceLeftComponents[this.arrayDistanceLeftComponents.length-1] + 150);
   }

  async addObject(url:string){

   

    if(url === 'assets/component/actor.png'){
      

    }

    if(url === 'assets/component/boundary.png')
      var objSequence= await this.fabricService.toBoundary(this.leftObject,20);

    if(url === 'assets/component/control.png')
      var objSequence= await this.fabricService.toBoundary(this.leftObject,20);

    if(url === 'assets/component/entidad.png')
      var objSequence= await this.fabricService.toBoundary(this.leftObject,20);

   // const img = await this.fabricService.createImage(url,this.leftObject,50);
    //var img= await this.fabricService.toBoundary(this.leftObject,20);
    this.objSequence.scaleToWidth(70);
    this.arrayDistanceLeftComponents.push(this.leftObject) // Hacer que la imagen no sea seleccionable
    this.obj= new ObjectComp(this.arrayElements.length+1,url,50, this.leftObject)
    this.arrayElements.push(this.obj)
    this.diagramCanvas.add(this.objSequence)

    this.objSequence.setCoords();

    const imgTop = this.objSequence.top || 0; 
    const imgHeight = this.objSequence.height || 0; 

    const lifeLine= await this.fabricService.lineLife(this.leftObject, imgTop, imgHeight);
    this.diagramCanvas.add(lifeLine); 

    // const chartLife= await this.fabricService.chartLife(this.leftObject+27,150,250);
    // this.diagramCanvas.add(chartLife);

    this.diagramCanvas.on('object:moving', (e: any) => {
      if (e.target === this.objSequence) {
        this.handleObjectImgMoving(e, this.objSequence, lifeLine);
      }
    });
  }
  
  startDrawing(): void {
  this.isDrawingLine = true;  
  }

  async addChartActivation(){
    var chartActivation= await this.fabricService.chartLife(200,200,50);
    chartActivation.setCoords();
    this.diagramCanvas.add(chartActivation);
    this.diagramCanvas.bringToFront(chartActivation);

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
             console.log(lineMessage);
             
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

  async addToChartText(message: string){
    try {
      const chartText= await this.fabricService.chartText(200,200,message);
      this.diagramCanvas.add(chartText);
      
      this.diagramCanvas.renderAll(); // Renderiza el lienzo para que los cambios sean visibles

    } catch (error) {
      console.log(error);
      
    }
  }

//Añadir fragmento de interaccion loop, opt, break, critical
  async addRectFrag(){
    try {
   await this.modalTypeFragment();
    } catch (error) {
      console.log(error);     
    }
  }

  //CUADRO DE TEXTO
  async addFragText(left:number, top: number, message: string){
    try {
      const rec = await this.fabricService.charTextFragmento(message, left, top);
      this.diagramCanvas.add(rec)
    } catch (error) {
      console.log(error);
      
    }
  }
  //MODAL PARA ELEGIR TIPO DE INTERACCION
  async modalTypeFragment(){
    try {
      const { value: selectedOption } = await Swal.fire({
          title: 'Selecciona una opción de restricción de interacción',
          input: 'select',
          inputOptions: {
              'loop': 'loop',
              'par': 'par',
              'opt': 'opt',
              'alt': 'alt',
              'break': 'break',
              'critical': 'critical'
          },
          inputPlaceholder: 'Selecciona una opción',
          showCancelButton: true,
          html: '<label>condición</label><input id="condition" class="form-control">',
          focusConfirm: false,
          // preConfirm: () => {
          //     const conditionInput = document.getElementById('condition') as HTMLInputElement;
          //     return conditionInput.value; // Devuelve el valor del input
          // },
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
      });

      if (selectedOption) {
          console.log('Opción seleccionada:', selectedOption);
          const condition = (document.getElementById('condition') as HTMLInputElement).value;
          console.log('Condición ingresada:', condition);

          if(selectedOption === 'par'){
            var chartInteraction= await this.fabricService.chartFragPar();
            chartInteraction.setCoords();
            this.diagramCanvas.add(chartInteraction);
          }

          if (selectedOption === 'alt') {
              var chartInteraction = await this.fabricService.chartFragAlt(condition);
              chartInteraction.setCoords();
              this.diagramCanvas.add(chartInteraction);
          }
          
          if(selectedOption === 'loop' || selectedOption === 'break' || selectedOption === 'opt' || selectedOption === 'critical'){
            var chartInteraction = await this.fabricService.chartFragLoopBreakOptCritical(selectedOption, condition);
            chartInteraction.setCoords();
            this.diagramCanvas.add(chartInteraction);
          }     
      } else {
          console.log('No se ha seleccionado ninguna opción');
      }
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
        hasBorders: false,
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
      left: leftImg +35 ,
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
