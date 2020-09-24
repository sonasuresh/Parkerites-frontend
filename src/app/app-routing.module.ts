import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RegistervehicleComponent } from './components/registervehicle/registervehicle.component';
import { HomeComponent } from './components/home/home.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';


const routes: Routes = [
  {path:'',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'registervehicle',component:RegistervehicleComponent},
  {path:'home',component:HomeComponent},
  {path:'bookings',component:MyBookingsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
