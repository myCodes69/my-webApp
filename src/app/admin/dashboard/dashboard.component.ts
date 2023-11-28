import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminApiService } from '../admin-api.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  public isAdmin:any='';
  public totalRows:number=0;
  public startLinkIndex:number=1;

  public addfoodForm:any = '';
  public editfoodForm:any='';
  public entireFoodData:any=[];
  
  public selectedFoodItem:any=[];

  constructor(
    private router:Router,
    private adminService:AdminApiService,
    private fBuilder:FormBuilder
    ) {
        
          this.addfoodForm =
          this.fBuilder.group({
            'food_name':['',[Validators.required]],
            'food_desc':['',[Validators.required]],
            'food_price':['',[Validators.required,Validators.min(100)]],
            'food_image':['']
          });
          this.editfoodForm =
          this.fBuilder.group({
            'food_name':['',[Validators.required]],
            'food_desc':['',[Validators.required]],
            'food_price':['',[Validators.required,Validators.min(100)]],
            'food_image':['']
          });
     }

  populateallFoods():void{
      this.adminService.getAllFoods()
      .subscribe((res:any)=>{
        //console.log(res);
        this.totalRows = res.length;
        this.entireFoodData = res;
        console.log(this.totalRows);
        console.log(this.entireFoodData);

      })
  }
  ngOnInit(): void {
    this.isAdmin = localStorage.getItem("isAdmin");
    
     this.populateallFoods();

  }
  onAddFood(){
    console.log(this.addfoodForm.value);
    
    //Let's convert the entire data into form data object.
    let myformData = new FormData();
    
    myformData.append("food_name",this.addfoodForm.get('food_name').value);
    myformData.append("food_desc",this.addfoodForm.get('food_desc').value);
    myformData.append("food_price",this.addfoodForm.get('food_price').value);
    myformData.append("food_image",this.addfoodForm.get("food_image").value);
    //append --> adding at end of formdata 
    //prepend --> adding at the starting of formdata.

    this.adminService.addFoodItem(myformData)//Observable
    .subscribe((res:any)=>{
      console.log(res);
      alert(res.message);
      this.populateallFoods();
      var closeBtn =
      document.getElementById('closeModalBtn') as HTMLButtonElement;

      closeBtn.click();

    });


  }
  onSelect(e:any){
      //console.log(e.target.files[0]);
      let file = e.target.files[0];
      this.addfoodForm.get('food_image').setValue(file);
      }
    onFileSelectForeditModal(e:any){
      let file = e.target.files[0];
      this.editfoodForm.get('food_image').setValue(file);
   }   
  onDelete(foodId:any){
    console.log(foodId);
   var r = confirm("Do You want to delete this food ?");
   if(r){
    this.adminService.deleteFood(foodId)
    .subscribe((res:any)=>{
      console.log(res);
      alert(res.message);
      this.populateallFoods();
    });
  }
  }
  selectFood(foodObj:any){
    //console.log(foodObj);
    this.selectedFoodItem = foodObj;
    console.log(this.selectedFoodItem);
//setting up all editable data into the modal.
    this.editfoodForm.get('food_name').setValue(this.selectedFoodItem.food_name);
    this.editfoodForm.get("food_desc").setValue(this.selectedFoodItem.food_desc)
;
    this.editfoodForm.get('food_price').setValue(this.selectedFoodItem.food_price);
    var image1 = document.getElementById('image1') as HTMLImageElement;
    image1.src= this.selectedFoodItem.food_image;

}
  onfoodUpdate(){
      let myformData = new FormData();

      myformData.append("food_name",this.editfoodForm.get('food_name').value);
      myformData.append("food_desc",this.editfoodForm.get('food_desc').value);
      myformData.append("food_price",this.editfoodForm.get('food_price').value);
      myformData.append("food_image",this.editfoodForm.get("food_image").value);
      console.log(this.editfoodForm.value);

      this.adminService.updateFood(this.selectedFoodItem._id,myformData)
      .subscribe((res:any)=>{
        alert(res.message);
        this.populateallFoods();
        var editCloseBtn = document.getElementById('editCloseModal') as HTMLButtonElement;
        editCloseBtn.click();

      });

  }
  logout(){
      localStorage.clear();
      alert("Admin logged Out !");
      this.router.navigateByUrl("/admin");
  }
}
