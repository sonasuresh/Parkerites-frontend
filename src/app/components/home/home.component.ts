import { Component, OnInit } from '@angular/core';
import { BookingServiceService } from 'src/app/booking-service.service';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vehicleForm: FormGroup;

  allSlots:Array<any>=[]
  slotId:number
  vehicleId:number
  availableSlots:Array<any>=[]
  Slots:Array<any>=[]
  userId:number
  buttonDisabled:boolean=false
  vehicles:Array<any>=[]
  value:number; 

  constructor(private slotservice:BookingServiceService,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      this.router.navigate(['/login'])
    }
    const uid=localStorage.getItem('uid')
    this.getMyVehicles(uid)
    this.createForm();
    this.getSlots();
  }
  getMyVehicles(uid){
    this.slotservice.getMyVehicles(uid).then((res:any)=>{
      this.vehicles=res.data
    })
  }
  createForm() {
    this.vehicleForm = this.formBuilder.group({
      vehicleId: ['', Validators.required]
    });
  }
  getSlots(){
    this.slotservice.getAllSlots().then((res:any)=>{
      this.allSlots=res.data
      //console.log(this.allSlots)
      this.getAvailbleSlots();

      
    });
  }
  getAvailbleSlots(){
    this.slotservice.getAvailableSlots().then((res:any)=>{
      this.availableSlots=res.data
      console.log(this.availableSlots)
      //  for(var i = 0;i<=this.allSlots.length-1;i++)
      //    this.allSlots[i]=this.allSlots[i].id  
      //   this.availableSlots=this.allSlots.filter(n =>this.availableSlots.includes(n))
        
    })

  }
  vehicle(id:any){
    this.vehicleId=id;
  }

  book(id){
    this.slotId=id

 
   }
   bookSlot(){
     console.log(this.vehicleId)
   // const vehicleId=this.vehicleForm.value.vehicleId
   this.userId=JSON.parse(localStorage.getItem('uid'))
    this.slotservice.bookSlot(this.slotId,this.userId,this.vehicleId).then((res:any)=>{
      
      alert("Booked successfully")
    this.getSlots();

    }).catch((e)=>{
      alert("Booking failed!Try Again")
    })  
   }

}
