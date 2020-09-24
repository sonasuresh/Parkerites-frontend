import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor() { }
  getAllSlots(){
    return axios.get("http://localhost:3000/slots/")
  }
  getAvailableSlots(){
    return axios.get("http://localhost:3000/slots/available")
  }
  bookSlot(id,userId,vehicleId){

    const body={
      userId:userId,
      slotId:id,
      vehicleId:vehicleId
    }
    return axios.post("http://localhost:3000/booking/",body)
  }
  getMyVehicles(uid){
    return axios.get("http://localhost:3000/vehicle/"+ uid)
  }
  getAllBookings(uid){
    return axios.get("http://localhost:3000/booking/"+uid)
  }
  cancelBooking(id){
    return axios.delete("http://localhost:3000/booking/"+id)
  }
} 
