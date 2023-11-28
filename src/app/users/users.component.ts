import { Component, OnInit } from '@angular/core';
import { User } from './model/User';
import { Login } from './model/Login';
import { UsersApiService } from './users-api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 public myUser = new User('','','','','','','');
 public loginCheck = new Login('','');

 constructor(private userService:UsersApiService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.myUser);
    let dataToSubmit = {
      'name' : this.myUser.firstName+" "+this.myUser.middleName+" "+this.myUser.lastName,
      'phone': this.myUser.phone,
      'email': this.myUser.email,
      'pass1': this.myUser.pass1
    };
    console.log(dataToSubmit);
    this.userService.signUp(dataToSubmit)
    .subscribe((res:any)=>{
      console.log(res);
      alert(res.message);
    });

  }
  onLogin(){
    console.log(this.loginCheck);
    let dataToSubmit = {
      'email': this.loginCheck.username,
      'pass1': this.loginCheck.pass1
    };
    console.log(dataToSubmit);

    this.userService.signIn(dataToSubmit)
    .subscribe((res:any)=>{
       console.log(res);
      if(res.status =='success'){
          alert(res.message);
          //now store user's infomation at localStorage.
          localStorage.setItem('USER', res.activeUser);
          localStorage.setItem('TOKEN',res.token);
          //store user_id
          localStorage.setItem("userId",res.user_id);

          //Now redirect to foods Component.
          this.router.navigateByUrl('/foods');

      }else{
          alert("Wrong Cridentials");
      }
      //alert(res.message);
      /*let userInfo = res;
      let isValid = false;
    for(let userObj of userInfo){
         if(userObj.email== this.loginCheck.username && userObj.pass1 == this.loginCheck.pass1){
             isValid = true;
             break;
         }else {
            isValid=false;
         }
    }

       if(isValid){
           alert("Login Successfull !");
           this.router.navigateByUrl("/users/dashboard");
       }else{
        alert("Wrong Cridentials");
       }*/

    });


  }
}
