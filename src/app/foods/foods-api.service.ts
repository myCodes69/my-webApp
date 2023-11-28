import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodsApiService {
  private __url:string='https://foodordersystem.glitch.me';

  constructor(private http:HttpClient) { }

  getAllFoods(){
     return this.http.get(`${this.__url}/api/foods`);
     
  }

  getfoodByPrice(lim1:number,lim2:number){
     return this.http.get(`${this.__url}/api/foods/${lim1}/${lim2}`);
     
  }




}
