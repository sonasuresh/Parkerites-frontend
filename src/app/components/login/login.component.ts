import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';

import {Router} from '@angular/router';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder,private userService:UserServiceService) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      number: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login(){
    console.log(this.loginForm.value.number)
    this.userService.login(this.loginForm.value).then((res: any) => {
      localStorage.setItem('uid',res.data.id)
      localStorage.setItem('token',res.data.token)

      this.router.navigate(['/home'])

  }).catch(
      () => alert('Login Failed'))
    
  }
}
