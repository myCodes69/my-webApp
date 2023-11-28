import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'food_filter'
})
export class FoodFilterPipe implements PipeTransform {

  transform(entirefoodList:any,searchedData:string):any{
        if(searchedData.length>=3){
          //search will starts...
          let searchedFoodItems = entirefoodList.filter((foodObj:any)=>{
                if(foodObj.food_name.trim().toLowerCase().includes(searchedData.trim().toLowerCase())){
                     return foodObj;
                }
          });
          return searchedFoodItems;
        }else{
          return entirefoodList;
        }
        
  }

}
