import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { ManageModule } from './manage/manage.module'

import { AppComponent } from './app.component';
//routing
import { HolidayManagerRoutingModule } from './app-routing.module'

// shared
import { InfoPanelComponent } from './shared/info-panel/info-panel.component';
//dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashCalComponent } from './dash-cal/dash-cal.component';

import { ProfileComponent } from './profile/profile.component';
import { ApproveComponent } from './approve/approve.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileUserComponent } from './shared/profile-user/profile-user.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoPanelComponent,
    DashboardComponent,
    DashCalComponent,
    ProfileComponent,
    ApproveComponent,
    CalendarComponent,    
    ProfileUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ManageModule,
    HolidayManagerRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
