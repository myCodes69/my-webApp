import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../users-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public usersList:any=[];
  constructor(private userService:UsersApiService) { }

  ngOnInit(): void {
/*
       this.userService.getAllUsers()
       .subscribe((res:any)=>{
        console.log(res);
        this.usersList = res;

       });
       */
  }

}
