import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
  registerUser(data:any){
    const body = {
      mobile: data.number,
      password: data.password
    }
    return axios.post("http://localhost:3000/users", { ...body })
  }
  registerUserVehicleDetails(data:any,userId:number){
    const body = {
      vehicleNumber: data.number,
      rfid: data.rfid,
      userId:userId
    }
    return axios.post("http://localhost:3000/vehicle", { ...body })
  }
  login(data:any){
    const body = {
      mobile: data.number,
      password: data.password
    }
    return axios.post("http://localhost:3000/users/login", { ...body })
  }
}
