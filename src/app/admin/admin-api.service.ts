import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  private _url:string ='https://foodordersystem.glitch.me';

  constructor(private http:HttpClient) { }

  getAllFoods(){
    return this.http.get(`${this._url}/api/foods`);

  }

addFoodItem(foodData:FormData){
     return this.http.post(`${this._url}/api/food`,foodData);

}  
updateFood(foodId:any,foodData:FormData){
      return this.http.put(`${this._url}/api/food/${foodId}`,foodData);
      
}
deleteFood(id:any){
    return this.http.delete(`${this._url}/api/food/${id}`);
    
}

}
