import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {
  private _url:string='https://foodordersystem.glitch.me';
  constructor(private http:HttpClient) { }

  placeOrder(user_id:any,food_id:any){
       return this.http.post(`${this._url}/order/${user_id}/${food_id}`,{});


  }

  vieworder(userId:any){
     return this.http.get(`${this._url}/order/view/${userId}`);
     
  }
}
