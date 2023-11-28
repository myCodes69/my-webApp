import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
 // private fake_Api_url="http://localhost:3000";
 private __url:string ='https://foodordersystem.glitch.me';

 constructor(private http:HttpClient) { }

  signUp(userData:any){
    return this.http.post(
      `${this.__url}/api/user/signup`,
       userData 
    );

  }

  signIn(userData:any){
     return this.http.post(
   `${this.__url}/api/user/signin`,  userData);
  }

/*  getAllUsers(){
    return this.http.get(`${this.fake_Api_url}/users`);
    
  }*/

}
