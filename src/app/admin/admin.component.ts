import { Component, OnInit } from '@angular/core';
//import the model.
import { Admin } from './model/Admin';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public isAdmin = new Admin('','');
  private userName:string ='admin';
  private passWord:string ='admin@123';
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
       if(this.isAdmin.username == this.userName && this.isAdmin.password == this.passWord){
         // return true;
         alert(`Welcome ${this.userName}`);
         //saving admin userbame into localStorage.
         localStorage.setItem("isAdmin",this.userName);
         this.router.navigateByUrl("admin/dashboard");


       }else{
        //return false;
        alert("Wrong Cridentials !");
       }
  }

}
