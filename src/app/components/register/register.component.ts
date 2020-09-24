import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  constructor(private router: Router,private userService:UserServiceService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.regForm = this.formBuilder.group({
      number: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  registerUser(){
    this.userService.registerUser(this.regForm.value).then((res: any) => {
      const userId=res.data.createUserResults
      // const userId={
      //   userId:res.data.createUserResults
      // }
     // console.log(userId)
      this.router.navigate( ['/login' ])
    }).catch(
      () => alert('Registration Failed'))
      
     
  }
}
