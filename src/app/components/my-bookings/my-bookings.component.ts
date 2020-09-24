import { Component, OnInit } from '@angular/core';
import { BookingServiceService } from 'src/app/booking-service.service';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  allBookings:Array<any>=[]
  uid:number
  previousBookings:Array<any>=[]
  currentBookings:Array<any>=[]
  currentBookingFlag:boolean=true
  previousBookingFlag:boolean=false
  cancelDisableFlag:boolean=false
  constructor(private slotservice:BookingServiceService,private router: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      this.router.navigate(['/login'])
    }
     this.uid=JSON.parse(localStorage.getItem('uid'))
    this.getAllBookings()
  }
  getAllBookings(){
    this.slotservice.getAllBookings(this.uid).then((res:any)=>{
      this.allBookings=res.data
     // console.log(this.allBookings[0].status)
      for(var i=0;i<this.allBookings.length;i++){
        this.cancelDisableFlag=false
        if(this.allBookings[i].status=='completed'){
          this.previousBookings[i]=this.allBookings[i]
        }
        if(this.allBookings[i].status!='completed'){
          var date=new Date(this.allBookings[i].bookingTime)
          var halfAnHourAfter = moment(date).add(30, 'm').toDate();
          var current = new Date()
          if(halfAnHourAfter<current){
            this.cancelDisableFlag=true
          }
          console.log(current,"current")
          console.log(halfAnHourAfter,"book time")
          this.currentBookings[i]=this.allBookings[i]
          this.currentBookings[i].cancelBookingFlag=this.cancelDisableFlag
    console.log(this.currentBookings[i])        
          }
        
      }
      this.previousBookings = this.previousBookings.filter(function (ele) {
        return ele != null;
      });
      this.currentBookings = this.currentBookings.filter(function (ele) {
        return ele != null;
      });

     })
  }

  getCurrentBookings(){
    this.currentBookingFlag=true
    this.previousBookingFlag=false
  }
  getPreviousBookings(){
    this.previousBookingFlag=true
    this.currentBookingFlag=false
  }
  cancel(id:any){
    if(confirm('Are you sure to Cancel this Booking?')){
      this.slotservice.cancelBooking(id).then((res:any)=>{
        alert("Booking Cancelled Successfully")
        window.location.reload()
      }).catch((e)=>{
        alert("Failed to Cancel!")
      })
    }
    
  }

}
