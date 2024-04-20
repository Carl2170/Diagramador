import {  AfterViewInit, HostListener, Component, OnInit, ViewChild, viewChild} from '@angular/core';
import { SocketWebService } from '../../services/socketIO/socket-web.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrl: './draw.component.scss'
})
export class DrawComponent implements OnInit, AfterViewInit{
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    
  }
}
