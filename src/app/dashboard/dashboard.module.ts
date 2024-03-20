import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RoomComponent } from './pages/room/room.component';

import { CookieService } from 'ngx-cookie-service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DrawComponent } from './components/draw/draw.component';
const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HomeComponent,
    HeaderComponent,
    SideNavComponent,
    MainComponent,
    ProfileComponent,
    RoomComponent,
    DrawComponent
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SocketIoModule.forRoot(config)

  ],
  providers: [CookieService],
})
export class DashboardModule { }
