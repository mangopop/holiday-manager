import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { HolidayService } from '../shared/holiday.service';
import { ConstantsService } from '../shared/constants.service';

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

  constructor(
    public HolidayService: HolidayService,
    public ConstantsService: ConstantsService,
    ) {}

  uid: string;
  constants$: FirebaseListObservable<any>;
  basic: number;
  daysLeft: number;
  daysTaken: number;
  daysPending: number;
  bookingData$: FirebaseListObservable<any>;
  bookingDataSub;
  constantsSub;

  getConstants(){
    this.constants$ = this.ConstantsService.getConstants();
    this.constantsSub = this.constants$.subscribe(data => {
      this.basic = data[0].$value;
    });
  }

  // getLoginStatus() {
  //   console.log('call getLoginStatus from dashboard');    
  //   // this.userId = this.LoginStatus.getStatus(); //TODO: should wait for this first
  //   this.LoginStatus.getAuth().subscribe(auth => {      
  //     if (auth != null) {
  //       console.log(auth);
  //       this.uid = auth.uid;
  //       this.getHolidayInfo();
  //     } else {
  //       console.log('error getting auth');
  //     }
  //   });
  // }

  getHolidayInfo() {
    console.log('call getHolidayInfo from dashboard');
    this.bookingData$ = this.HolidayService.getHolidays();

    // ERROR: for some reason this log displays accumulating arrays
    // https://github.com/angular/angularfire2/blob/master/docs/4-querying-lists.md
    // https://github.com/angular/angularfire2/issues/574

    //array of matching bookings for user      
    this.bookingDataSub = this.bookingData$.subscribe(data => {    
      console.log(data);
      
      // approved panel hols      
      this.daysTaken = data.filter(hol => hol.status === 'approved').reduce((pre, cur) => pre + cur.daysTaken,0);      
      this.daysLeft = this.basic - this.daysTaken;
      //  pending panel hols
      this.daysPending = data.filter(hol => hol.status === 'pending').reduce((pre, cur) => pre + cur.daysTaken,0);
      // bookingDataSub.unsubscribe();
    });

  }

  ngOnInit() {
    this.getConstants();
    this.getHolidayInfo();
  }

  ngOnDestroy(){
    this.bookingDataSub.unsubscribe();
    this.constantsSub.unsubscribe();
  }

}
