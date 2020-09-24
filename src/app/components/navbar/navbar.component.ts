import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  addNewVehicle(){
    this.router.navigateByUrl('/registervehicle')
  }
  home(){
    this.router.navigateByUrl('/home')

  }
  bookings(){
    this.router.navigateByUrl('/bookings')
  }
}
