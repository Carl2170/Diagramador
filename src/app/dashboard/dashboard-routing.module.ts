import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { loginGuard } from '../auth/guards/is-authenticated.guard';

const routes: Routes =[
  {path:'',
  component:DashboardLayoutComponent,
  canActivate:[loginGuard],
    children:[
    {path:'home', component:HomeComponent},
    {path:'profile', component:ProfileComponent}
  ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutingModule { }
