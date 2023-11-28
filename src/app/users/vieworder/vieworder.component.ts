import { AfterViewInit, Component } from '@angular/core';
import { OrderApiService } from '../order-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements AfterViewInit {
     public billingInfo:any=[];
     public activeUser:any='';
     constructor(private orderService:OrderApiService,private router:Router){}
     ngAfterViewInit(): void {
          this.orderService.vieworder(localStorage.getItem("userId"))
          .subscribe((res:any)=>{
            console.log(res);
            this.billingInfo = res;
            this.activeUser = localStorage.getItem('USER');
            console.log(this.billingInfo);
          });
     }

     logout(){
        localStorage.clear();
        alert("Logged Out !");
        this.router.navigateByUrl("/users");

     }
}
