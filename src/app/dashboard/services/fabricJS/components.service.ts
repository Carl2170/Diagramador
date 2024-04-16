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

  async toA(left: number, top: number):Promise<fabric.Group>{
    var circle = new fabric.Circle({
      radius: 5,
      fill: '#FFDAB9',
      left: left,
      top: top,
      selectable: false ,
      stroke: 'black',         // Color del borde del círculo
      strokeWidth: 1, 
    });
    
  
    // Crear la línea horizontal
    var brazos = new fabric.Line([left -5, top +12, left + 15, top +12], {
      stroke: 'black',
      strokeWidth: 1,
      selectable: false  // La línea horizontal no es seleccionable
    });

    var tronco = new fabric.Line([left +5 , top +10, left + 5, top +25], {
      stroke: 'black',
      strokeWidth: 1,
      selectable: false  // La línea horizontal no es seleccionable
    });
    
    // Crear la línea vertical
    var piernaIzq = new fabric.Line([left +5 ,top +25  ,left, top + 35 ], {
      stroke: 'black',
      strokeWidth: 1,
      selectable: false  // La línea vertical no es seleccionable
    });
    
    var piernaDer = new fabric.Line([left +5 ,top +25  ,left+10, top + 35 ], {
      stroke: 'black',
      strokeWidth: 1,
      selectable: false  // La línea vertical no es seleccionable
    });
    
    return new Promise((resolve, reject) => {  
      const control= new fabric.Group([circle, tronco, brazos, piernaDer,piernaIzq],{
        selectable: true,
        hasControls: true,
        hasBorders: true,
        lockUniScaling: true,
        lockScalingX: true,
        lockScalingY: true,
        lockMovementY: true 
      });
       resolve(control);
     });
  }

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
  async toBoundary(left: number, top: number):Promise<fabric.Group>{
    var circle = new fabric.Circle({
      radius: 30,
      fill: '#FFDAB9',
      left: left,
      top: top,
      selectable: false ,
      stroke: 'black',         // Color del borde del círculo
      strokeWidth: 2, // La figura redonda no es seleccionable
    });
    
    // Coordenadas de la línea horizontal
    var startX = left; // Empieza desde el lado izquierdo del círculo
    var startY = top + 30; // La misma altura que el círculo
    var endX = left -10;   // Toca el círculo
    var endY = top+30;   // La misma altura que el círculo
    
    // Crear la línea horizontal
    var horizontalLine = new fabric.Line([startX, startY, endX, endY], {
      stroke: 'black',
      strokeWidth: 2,
      selectable: false  // La línea horizontal no es seleccionable
    });
    
    // Crear la línea vertical
    var verticalLine = new fabric.Line([endX, top, endX,top + 60], {
      stroke: 'black',
      strokeWidth: 2,
      selectable: false  // La línea vertical no es seleccionable
    });
    
    return new Promise((resolve, reject) => {  
      const actor= new fabric.Group([circle, horizontalLine, verticalLine],{
        selectable: true,
        hasControls: true,
        hasBorders: true,
        lockUniScaling: true,
        lockScalingX: true,
        lockScalingY: true,
        lockMovementY: true 
      });
       resolve(actor);
     });
  }

  async toControl(left: number, top: number):Promise<fabric.Group>{
    var circle = new fabric.Circle({
      radius: 30,
      fill: '#FFDAB9',
      left: left,
      top: top,
      selectable: false ,
      stroke: 'black',         // Color del borde del círculo
      strokeWidth: 2, // La figura redonda no es seleccionable
    });
    
  
    // Crear la línea horizontal
    var ala1 = new fabric.Line([left +30, top, left + 35, top - 5], {
      stroke: 'black',
      strokeWidth: 2,
      selectable: false  // La línea horizontal no es seleccionable
    });
    
    // Crear la línea vertical
    var ala2 = new fabric.Line([left +30, top,left + 35, top + 5 ], {
      stroke: 'black',
      strokeWidth: 2,
      selectable: false  // La línea vertical no es seleccionable
    });
    
    return new Promise((resolve, reject) => {  
      const control= new fabric.Group([circle, ala1, ala2],{
        selectable: true,
        hasControls: true,
        hasBorders: true,
        lockUniScaling: true,
        lockScalingX: true,
        lockScalingY: true,
        lockMovementY: true 
      });
       resolve(control);
     });
  }

  async toEntity(left: number, top: number):Promise<fabric.Group>{
    var circle = new fabric.Circle({
      radius: 30,
      fill: '#FFDAB9',
      left: left,
      top: top,
      selectable: false ,
      stroke: 'black',         // Color del borde del círculo
      strokeWidth: 2, // La figura redonda no es seleccionable
    });
    
  
    // Crear la línea horizontal
    var line = new fabric.Line([left , top+60, left + 60, top + 60], {
      stroke: 'black',
      strokeWidth: 2,
      selectable: false  // La línea horizontal no es seleccionable
    });
    
   
    
    return new Promise((resolve, reject) => {  
      const control= new fabric.Group([circle, line],{
        selectable: true,
        hasControls: true,
        hasBorders: true,
        lockUniScaling: true,
        lockScalingX: true,
        lockScalingY: true,
        lockMovementY: true 
      });
       resolve(control);
     });
   
  }

  async toObject(left:number, top: number):Promise<fabric.Rect>{
    return new Promise((resolve, reject)=>{
      var rect = new fabric.Rect({
        left: left,
        top: top,
        width: 90,
        height: 60,
        fill: '#FFDAB9', // Relleno transparente
        stroke: 'black', // Color del contorno
        strokeWidth: 2, // Ancho del contorno
        selectable: true,
        hasControls: true,
        hasBorders: true,
        lockUniScaling: true,
        lockScalingX: true,
        lockScalingY: true,
        lockMovementY: true 
    });
    resolve(rect)
    })
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
        hasBorders: false,
      });
       resolve(line);
     });
  }

  async chartText(leftDistance:number, topDistance:number, text:string):Promise<fabric.Textbox>{
    return new Promise((resolve, reject) => {  
      const chartText= new fabric.Textbox(text, {
        left: leftDistance, // Posiciona el texto en el centro horizontal de la flecha
        top:topDistance, // Posiciona el texto en el centro vertical de la flecha
        selectable: true, // El texto no es seleccionable
        fontSize: 16, 
        editable:true,
        width:120,
        textAlign:'center'// Tamaño de la fuente
      });;
       resolve(chartText);
     });
  }

  //RECTANGULO
  async rectangule(left:number, top: number):Promise<fabric.Rect>{
    return new Promise((resolve, reject)=>{
      var rect = new fabric.Rect({
        left: left,
        top: top,
        width: 250,
        height: 150,
        fill: 'transparent', // Relleno transparente
        stroke: 'black', // Color del contorno
        strokeWidth: 2 // Ancho del contorno
    });
    resolve(rect)
    })
  }

  async chartOprion(x1: number, y1:number)
                    :Promise<fabric.Polygon>{

  var rectCoords2 = [
    { x: x1, y: y1 },  // Esquina superior izquierda
    { x: x1 + 55, y: y1 },  // Esquina superior derecha
    { x: x1 + 55, y: y1 + 20 },  // Esquina inferior derecha
    { x: x1 + 35, y: y1 + 30 },  // Punto de conexión de la línea diagonal
    { x: x1, y: y1 + 30 }   // Esquina inferior izquierda
];
    return new Promise((resolve, reject)=>{
      var rect = new fabric.Polygon(rectCoords2, {
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 2
    });
    resolve(rect)
    })
  }

  async chartTextPol(message: string, distLeft:number, distTop:number):Promise<fabric.Text>{
    return new Promise((resolve, reject)=>{
      var text = new fabric.Text(message, {
        top:distTop+4,
        left:distLeft+10,
        textAlign:'center',
        fontSize:16,
        fill:'black'
    });
    resolve(text);
    })
  }

  async charTextFragmento(message: string, distLeft:number, distTop:number):Promise<fabric.Group>{
     var text= await this.chartTextPol(message,distLeft, distTop);
  //  var text= await this.chartText(distLeft, distTop, message);

    var poli= await this.chartOprion(distLeft, distTop);

    
    return new Promise((resolve, reject) => {  
      const arrow= new fabric.Group([poli, text],{
        selectable: true, 
        lockUniScaling: true, 
        lockRotation: true, 
      });
       resolve(arrow);
     });
  }

  //ALT
  async chartFragAlt(condition:string):Promise<fabric.Group>{
    var chartTextFrag= await this.charTextFragmento('alt',200,200);
    var rect= await this.rectangule(200,200);
    var line= await this.line(200,275,450,275);
    //variable
    var chartTextIf= await this.chartTextPol(condition,250,205);
    var chartTextElse= await this.chartTextPol('[else]',205,280)

    line.set({ strokeDashArray: [5, 5]})
    
    return new Promise((resolve, reject) => {  
      const rectAlt= new fabric.Group([rect, chartTextFrag,line,chartTextIf, chartTextElse],{
        selectable: true, 
        lockUniScaling: true, 
        lockRotation: true,  
      });
       resolve(rectAlt);
     });
  }

  //LOOP, BREAK, OPT, CRITICAL
  async chartFragLoopBreakOptCritical(type: string, condition: string):Promise<fabric.Group>{
    if(type === 'loop'){
      var chartTextFrag= await this.charTextFragmento('loop n',200,200);
    }else{
      var chartTextFrag= await this.charTextFragmento(type,200,200);
    }

    var rect= await this.rectangule(200,200);
    var chartTextCondicion= await this.chartTextPol(condition,250,205); 
    
    return new Promise((resolve, reject) => {  
      const rectAlt= new fabric.Group([rect, chartTextFrag,chartTextCondicion],{
        selectable: true, 
        lockUniScaling: true, 
        lockRotation: true, 
      });
       resolve(rectAlt);
     });
  }
  //PAR
  async chartFragPar():Promise<fabric.Group>{
    var chartTextFrag= await this.charTextFragmento('par',200,200);
    var rect= await this.rectangule(200,200);
    var line= await this.line(200,275,450,275);
    //variable

    line.set({ strokeDashArray: [5, 5]})
    
    return new Promise((resolve, reject) => {  
      const rectAlt= new fabric.Group([rect, chartTextFrag,line],{
        selectable: true, 
        lockUniScaling: true, 
        lockRotation: true, 
      });
       resolve(rectAlt);
     });
  }


  //ACTOR
  async toActor(url: string, leftDistance: number, topDistance: number): Promise<fabric.Image> {
    return new Promise((resolve, reject) => {  
      fabric.Image.fromURL(url, (img: any) => {
        img.scaleToWidth(30); // Ajustar el tamaño de la imagen según sea necesario
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

}
