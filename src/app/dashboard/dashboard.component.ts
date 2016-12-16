import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { HolidayService } from '../shared/holiday.service';
import { LoginStatusService } from '../shared/login-status.service';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

/* TODO
    get total holiday from user, will need to add this in the new user area.
*/ 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public LoginStatus: LoginStatusService, public HolidayService: HolidayService) {
    this.getLoginStatus();
  }


  daysLeft: any;
  daysTaken: any;
  bookingData: FirebaseListObservable<any>;
  userId;
  // hols:any = [{daysTaken:7},{daysTaken:7}];

  getLoginStatus() {
    this.userId = this.LoginStatus.getStatus(); //TODO: should wait for this first
  }

  getHolidayInfo() {

    this.bookingData = this.HolidayService.getAllHolidays();
    // ERROR: for some reason this log displays accumlating arrays
    // https://github.com/angular/angularfire2/blob/master/docs/4-querying-lists.md
    // https://github.com/angular/angularfire2/issues/574

    this.bookingData.first().subscribe(data => { //array of matching bookings for user

      //   next: x => console.log("got daysLeft '%x'", x),
      //   error: err => console.error('something wrong occurred: ' + err),
      //   complete: () => console.log('done'),

      // daysleft panel
      this.daysTaken = data.reduce((pre, cur, currentIndex, array) => { //for each booking
        return pre.daysTaken + cur.daysTaken
      });

      // daysTaken panel
      // this.daysLeft = data.reduce((pre, cur, currentIndex, array) => { //for each booking
      //   return pre.daysTaken + cur.daysTaken
      // });

    });
  }

  ngOnInit() {
    this.getHolidayInfo();
  }

  ngOnDestroy(){
    // this.bookingData.unsubscribe();
  }

}
