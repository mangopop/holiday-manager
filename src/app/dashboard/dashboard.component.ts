import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { HolidayService } from '../shared/holiday.service';
import { UserListService } from '../shared/user-list.service';
import { ConstantsService } from '../shared/constants.service';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';

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
    public UserListService: UserListService,
    public ConstantsService: ConstantsService,
  ) { }

  uid: string;
  // constants$: FirebaseListObservable<any>;
  basic: number;
  daysLeft: number;
  daysTaken: number;
  daysPending: number;
  service: number;
  testService:Observable<any>;
  testObj;
  // bookingData$: FirebaseListObservable<any>;
  bookingDataSub;
  constantsSub;
  userDataSub;

  // this is still doing things the old way, should probably thread this through elsewhere

  getConstants() {
    // this.constants$ = this.ConstantsService.getConstants();
    this.constantsSub = this.ConstantsService.getConstants().subscribe(data => {
      this.basic = data[0].$value;
    });
  }

  getHoliday(){
    this.HolidayService.getHolidayInfo().subscribe(data =>{      
      this.daysLeft = data.daysLeft();
      this.daysPending = data.daysPending;
      this.daysTaken = data.daysTaken;
    });
  }



  getHolidayInfo() {
    // ERROR: for some reason this log displays accumulating arrays
    // https://github.com/angular/angularfire2/blob/master/docs/4-querying-lists.md
    // https://github.com/angular/angularfire2/issues/574

    // array of matching bookings for user      
    this.bookingDataSub = this.HolidayService.getHolidaysByUserId().subscribe(data => {
      var currentYear = new Date().getFullYear();
      // we should only process the days that match the current year
      // TODO: do not process sick or unpaid
      this.daysTaken = data.filter(hol => {
        var from = new Date(hol.fromDate).getFullYear();
        var to = new Date(hol.toDate).getFullYear();
        return hol.status === 'approved' && (hol.type != 'Sick' && hol.type != 'Unpaid')
        // if any from or to data matches currentyear or currentyear + 1
        && (from === currentYear || to === currentYear || from === currentYear +1 || to === currentYear +1)
      }).reduce((pre, cur) => pre + cur.daysTaken, 0);
      //  pending panel hols
      this.daysPending = data.filter(hol => {
        var from = new Date(hol.fromDate).getFullYear();
        var to = new Date(hol.toDate).getFullYear();
        return hol.status === 'pending' && (hol.type != 'Sick' && hol.type != 'Unpaid')
        // if any from or to data matches currentyear or currentyear + 1
        && (from === currentYear || to === currentYear || from === currentYear +1 || to === currentYear +1)
      }).reduce((pre, cur) => pre + cur.daysTaken, 0);

      this.userDataSub = this.UserListService.getUserByEmail().subscribe(data => {
        // var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth();
        var startDate = new Date(data[0].startDate)
        var startYear = startDate.getFullYear();
        // calculate service
        var served = currentYear - startYear;

        if (served < 5) { this.service = 0 }
        if (served >= 5 && served <= 9) { this.service = 1 }
        if (served >= 10 && served <= 14) { this.service = 3 }
        if (served >= 15) { this.service = 5 }

        // don't use basic if user has start in same year
        if (currentYear === startYear) {
          console.log('same year');          
          this.daysLeft = Math.floor(((currentMonth - startDate.getMonth() + 1) / 12) * this.basic) - this.daysTaken + this.service + data[0].xhol;
          // this.daysLeft = Math.floor((currentMonth - startDate.getMonth() +1) * 1.66);
        } else {
          this.daysLeft = this.basic - this.daysTaken + this.service + data[0].xhol;
        }
      });

      this.bookingDataSub.unsubscribe();
    });

  }

  ngOnInit() {
    this.getConstants();
    this.getHolidayInfo();
    // this.testMergeService();
  }

  ngOnDestroy() {
    this.bookingDataSub.unsubscribe();
    this.constantsSub.unsubscribe();
    this.userDataSub.unsubscribe();
  }

}
