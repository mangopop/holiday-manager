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
  // testService:Observable<any>;
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

  // testMergeService(){
  //   this.testService = this.HolidayService.testMerge();
  // }

  // the beast,
  // the beauty of this is we haven't subscribed, 
  // it's all in sync
  // and this is how services can be more useful
  // testMergeLocal() {
  //   var result$ = this.HolidayService.getHolidays().mergeMap(hol => {
  //     return this.UserListService.getUserByEmailAuto().mergeMap(user => { //nested mergeMap here is required
  //       return this.ConstantsService.getConstants().map(consants => {
  //         console.log(basic);         
  //           var daysTaken = hol.filter(hol => hol.status === 'approved').reduce((pre, cur) => pre + cur.daysTaken, 0);
  //           var daysPending = hol.filter(hol => hol.status === 'pending').reduce((pre, cur) => pre + cur.daysTaken, 0);
  //           var basic = consants[0].$value;
  //           return {
  //             daysTaken: daysTaken,
  //             daysPending: daysPending,
  //             daysLeft: (user) => {
  //               var currentYear = new Date().getFullYear();
  //               var startYear = new Date(user[0].startDate).getFullYear();
  //               return basic - daysTaken + Math.floor((new Date().getFullYear() - startYear) / 5);
  //             },
  //             basic: basic
  //           }
          
  //       });
  //     });
  //   });

  //   result$.subscribe(data => console.log(data));

  // }

  getHolidayInfo() {
    // ERROR: for some reason this log displays accumulating arrays
    // https://github.com/angular/angularfire2/blob/master/docs/4-querying-lists.md
    // https://github.com/angular/angularfire2/issues/574

    // array of matching bookings for user      
    this.bookingDataSub = this.HolidayService.getHolidays().subscribe(data => {

      this.userDataSub = this.UserListService.getUserByEmailAuto().subscribe(data => {
        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth();
        var startDate = new Date(data[0].startDate) 
        var startYear = startDate.getFullYear();
        this.service = Math.floor((currentYear - startYear) / 5);
        // don't use basic if user has start in same year
        if(currentYear === startYear){        
          this.daysLeft = Math.floor((currentMonth - startDate.getMonth() +1) * 1.66);
        }else{
          this.daysLeft = this.basic - this.daysTaken + this.service;
        }
      });

      // this.daysTaken = data.filter(hol => hol.status === 'approved').reduce((pre, cur) => pre + cur.daysTaken,0);      
      this.daysTaken = data.filter(hol => hol.status === 'approved').reduce((pre, cur) => pre + cur.daysTaken, 0);
      //  pending panel hols
      this.daysPending = data.filter(hol => hol.status === 'pending').reduce((pre, cur) => pre + cur.daysTaken, 0);
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
