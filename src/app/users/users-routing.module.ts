import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VieworderComponent } from './vieworder/vieworder.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  {path:'dashboard',component:DashboardComponent},
  {path:'vieworder',component:VieworderComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
