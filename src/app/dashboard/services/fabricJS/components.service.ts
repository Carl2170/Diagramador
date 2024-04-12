import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import {ObjectComp} from '../../../../classes/objectComp';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  private lineMessage:any;
  constructor() { }

  async createImage(url: string, leftDistance: number, topDistance: number): Promise<fabric.Image> {
    return new Promise((resolve, reject) => {  
      fabric.Image.fromURL(url, (img: any) => {
        img.scaleToWidth(70); // Ajustar el tamaño de la imagen según sea necesario
        img.set({
          left: leftDistance,
          top: topDistance,
          selectable: true,
          hasControls: true,
          hasBorders: true,
          lockUniScaling: true,
          lockScalingX: true,
          lockScalingY: true,
          lockMovementY: true
        })
        resolve(img); // Resuelve la promesa con la imagen creada
      }); 
    });
  }
  
  async chartLife(distLeft:number, distTop:number, distHeight:number):Promise<fabric.Rect>{
    return new Promise((resolve, reject) => {  
     const rect= new fabric.Rect({
        left: distLeft,
        top: distTop,
        width: 15,
        height: distHeight, // Altura mayor que la anchura
        fill: 'lightblue',
        stroke: 'black', // Color del borde
        strokeWidth: 2,
        lockScalingX:true,
      });
      resolve(rect); // Resuelve la promesa con la imagen creada
    });
  }

  async lineLife(distLeft:number,disTop:number, distHeight:number):Promise<fabric.Line>{
    return new Promise((resolve, reject) => {  
     const line= new fabric.Line([distLeft +35, 120, distLeft + 35,disTop + distHeight + 450 ],{
       stroke: 'black', // Color de la línea
       strokeWidth: 1, // Ancho de la línea
       strokeDashArray: [5, 5],
       selectable:true//
     });
      resolve(line);
    });
  }

  calculateLineLength(line: fabric.Line): number {
    var lineX1 = line.x1 || 0
    var lineX2 = line.x2 || 0
    var lineY1 = line.y1 || 0
    var lineY2 = line.y2 || 0

    const dx = lineX2 - lineX1; // Diferencia en la coordenada x
    const dy = lineY2 - lineY1; // Diferencia en la coordenada y
    const length = Math.sqrt(dx * dx + dy * dy); // Longitud calculada con la fórmula de distancia euclidiana
    return length;
  }

  async arrowSimple(line:fabric.Line):Promise<fabric.Group>{
    var startX = line.x1 || 0;
    var startY = line.y1 || 0;
    var endX = line.x2 || 0;
    var endY = line.y2 || 0; 
    // Calcular el ángulo de la flecha
    var angle = Math.atan2(endY - startY, endX - startX);
    // Longitud de la punta de la flecha
    var arrowLength = 10;
    // Crear las líneas de las alas de la flecha
    var arrowWing1 = new fabric.Line([endX, endY, endX - arrowLength * Math.cos(angle - Math.PI / 8), endY - arrowLength * Math.sin(angle - Math.PI / 8)], {
      stroke: 'black',
      strokeWidth: 2,
    });

    var arrowWing2 = new fabric.Line([endX, endY, endX - arrowLength * Math.cos(angle + Math.PI / 8), endY - arrowLength * Math.sin(angle + Math.PI / 8)], {
        stroke: 'black',
        strokeWidth: 2,
    });

    return new Promise((resolve, reject) => {  
      const arrow= new fabric.Group([line, arrowWing1,arrowWing2],{
        selectable: true, 
        lockUniScaling: true, 
        lockRotation: true, 
      });
       resolve(arrow);
     });
  }

  async arrowSegment(line: fabric.Line):Promise<fabric.Group>{
    var startX = line.x1 || 0;
    var startY = line.y1 || 0;
    var endX = line.x2 || 0;
    var endY = line.y2 || 0;
  
    var angle = Math.atan2(endY - startY, endX - startX);
    var arrowLength = 10;
    var arrowWing1 = new fabric.Line([endX, endY, endX - arrowLength * Math.cos(angle - Math.PI / 8), endY - arrowLength * Math.sin(angle - Math.PI / 8)], {
        stroke: 'black',
        strokeWidth: 2,
    });
  
    var arrowWing2 = new fabric.Line([endX, endY, endX - arrowLength * Math.cos(angle + Math.PI / 8), endY - arrowLength * Math.sin(angle + Math.PI / 8)], {
        stroke: 'black',
        strokeWidth: 2,
    });

    line.set({
      strokeDashArray: [5, 5],
    })

    return new Promise((resolve, reject) => {  
      const arrow= new fabric.Group([line, arrowWing1,arrowWing2],{
        selectable: true, 
        lockUniScaling: true, 
        lockRotation: true, 
      });
       resolve(arrow);
     });
  }
   
  async triangule(endPointX: any,endPointY:any, topDistance: any, direFle:any):Promise<fabric.Triangle>{
    return new Promise((resolve, reject) => {  
      const triangule= new fabric.Triangle({
              left:endPointX -6,
              top: endPointY - topDistance,
              width: 15,
              height: 15,
              fill: 'black',
              angle: direFle,  // Establecer el ángulo de la cabeza de la flecha a 0 grados (apunta hacia la derecha)
              selectable: false, 
      });
       resolve(triangule);
     });
  }

  async typeLineMessage(typeLine:string, line:fabric.Line, endPointX:any, endPointY:any):Promise<fabric.Group>{
    
    if(typeLine === 'asincrono'){
      this.lineMessage = await this.arrowSimple(line);
    }

    if(typeLine === 'sincrono'){
      let direFle=0;
      let topFle= 0;
      let lineX1= line.x1 || 0
      let lineX2= line.x2 || 0

      if(lineX1 < lineX2){
        direFle = -25
        topFle=5
      }else{
        direFle = 25
        topFle= 11
      }

      const trianguleHead= await this.triangule(endPointX,endPointY,topFle,direFle);
      trianguleHead.setCoords();

      this.lineMessage= new fabric.Group([line, trianguleHead],{
        selectable: true, 
        lockUniScaling: true, 
        lockRotation: true, 
      });
    }

    if(typeLine === 'respuesta'){
      this.lineMessage= await this.arrowSegment(line);
    }

    return new Promise((resolve, reject) => {  
       resolve(this.lineMessage);
     });
  }

  async line(startPointX:any, startPointY:any, endPointX: any, endPointY: any):Promise<fabric.Line>{
    return new Promise((resolve, reject) => {  
      const line= new fabric.Line([startPointX, startPointY, endPointX, endPointY],{
        stroke: 'black',
        strokeWidth: 2,
        lockMovementX: false, // Bloquear el movimiento horizontal
        hasControls: false,   // Ocultar los controles de selección
        hasBorders: false 
      });
       resolve(line);
     });
  }

  
}
