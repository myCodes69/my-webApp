import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FoodsApiService } from './foods-api.service';
//importing the food model.
import { food } from './model/food';
import { OrderApiService } from '../users/order-api.service';
@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit,AfterViewInit {
  public activeUser:unknown="";
  public foodList:any= [];
  
  public startLink:number=1;
  public totalFoodItems:number=0;
  
  public serahcedFoodItem:string='';
  public priceIndexFilter = new food(100,10000);



  constructor(
    private router:Router,
    private foodApi:FoodsApiService,
    private orderService:OrderApiService) { }

  ngOnInit(): void {
    if(localStorage.getItem("USER")!=null && localStorage.getItem("USER")!=''){
    //TypeSafety with TS unknow Type.
      if(typeof(this.activeUser)=='string'){
        this.activeUser = localStorage.getItem("USER");
      }
      
    }else {
      alert("You are not authorized to view this Page");
      this.router.navigateByUrl('/users');

  }
  
  
  }


  ngAfterViewInit(): void {
    this.foodApi.getAllFoods()
    .subscribe((res:any)=>{
      //console.log(res);
      this.foodList = res;
      console.log(this.foodList);
      this.totalFoodItems = this.foodList.length;
    });
  }
   onLogout(){
     //delete all data from preexisiting localStorage
     localStorage.clear();
     alert("You have successfully LoggedOut !!");
     this.router.navigateByUrl('/users');

   }

onGo(){
  console.log(this.priceIndexFilter);
  this.foodApi.getfoodByPrice(this.priceIndexFilter.startPriceIndex,this.priceIndexFilter.endPriceIndex)
  .subscribe((res:any)=>{
    console.log(res);
    this.foodList = res;
  });
}   

onBuy(food_id:any){
    console.log(food_id);
    console.log(localStorage.getItem("userId"));
    let userId = localStorage.getItem("userId");
    let foodId = food_id;
    this.orderService.placeOrder(userId,foodId)
    .subscribe((res:any)=>{
      var r = confirm("Do you want to Place This Order ?");

      if(r){
        alert(res.message);
         this.router.navigateByUrl("/users/vieworder");

      }
      //console.log(res);

    });

}

}
