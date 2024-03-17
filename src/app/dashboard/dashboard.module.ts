import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HomeComponent,
    HeaderComponent,
    SideNavComponent,
    MainComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
