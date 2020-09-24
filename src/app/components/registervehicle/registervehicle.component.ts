import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { UserServiceService } from 'src/app/user-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registervehicle',
  templateUrl: './registervehicle.component.html',
  styleUrls: ['./registervehicle.component.css']
})
export class RegistervehicleComponent implements OnInit {
  regForm: FormGroup;
  userId:number
 constructor(private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder,private userService:UserServiceService) {
   this.userId=JSON.parse(localStorage.getItem('uid')) 
   }

  ngOnInit(): void {
    this.createForm() 
  }
  createForm() {
    this.regForm = this.formBuilder.group({
      number: ['', Validators.required],
      rfid: ['', Validators.required]
    });
  }
  registerUserVehicleDetails(){
    //console.log(this.userId)
    this.userService.registerUserVehicleDetails(this.regForm.value,this.userId).then((res: any) => alert('Vehicle Registered')).catch(
      () => alert('Registration Failed'))
      
    
  }
}
