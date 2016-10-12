import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { ManageModule } from './manage/manage.module'
import { AngularFireModule } from 'angularfire2';

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

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyDt7XPG5SlKZz4iwYGgwrFatSYVSFltOkQ",
    authDomain: "holiday-51a9a.firebaseapp.com",
    databaseURL: "https://holiday-51a9a.firebaseio.com",
    storageBucket: "holiday-51a9a.appspot.com",
    messagingSenderId: "294500531950"
};


@NgModule({
  declarations: [
    AppComponent,
    InfoPanelComponent,
    DashboardComponent,
    DashCalComponent,
    ProfileComponent,
    ApproveComponent,
    CalendarComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
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
