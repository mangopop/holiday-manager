import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ApproveComponent } from './approve/approve.component';
import { ManageComponent } from './manage/manage.component';
import { CalendarComponent } from './calendar/calendar.component';
// import { ProfileUserComponent } from './shared/profile-user/profile-user.component';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },    
      { path: 'dashboard', component: DashboardComponent },    
      { path: 'profile', component: ProfileComponent },    
      { path: 'approve', component: ApproveComponent },    
      { path: 'manage', component: ManageComponent },    
      { path: 'calendar', component: CalendarComponent },    
    ])
  ],
  exports: [RouterModule],
  providers: []
})
export class HolidayManagerRoutingModule { }
