import { Component, OnInit, Input } from '@angular/core';

import { HolidayService } from '../../shared/holiday.service';
import { LoginStatusService } from '../../shared/login-status.service';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit {

  constructor(){}

  // constructor(public LoginStatus: LoginStatusService, public HolidayService: HolidayService) {
  //   this.getLoginStatus();
  // }

  @Input() title;
  @Input() value;

  // value: any;
  // userId;
  // // hols:any = [{daysTaken:7},{daysTaken:7}];

  // getLoginStatus() {
  //   this.userId = this.LoginStatus.getStatus(); //TODO: should wait for this first
  // }

  // getHolidayInfo() {
  //   // console.log(userId);

  //   const bookingData = this.HolidayService.getAllHolidays();
  //   // ERROR: for some reason this log displays accumlating arrays
  //   // https://github.com/angular/angularfire2/blob/master/docs/4-querying-lists.md

  //   bookingData.subscribe(data => { //array of matching bookings for user
  //     //   next: x => console.log("got value '%x'", x),
  //     //   error: err => console.error('something wrong occurred: ' + err),
  //     //   complete: () => console.log('done'),
  //     this.value = data.reduce((pre, cur, currentIndex, array) => { //for each booking
  //       return pre.daysTaken + cur.daysTaken
  //     });
  //   });
  // }

  ngOnInit() {
    // this.getHolidayInfo();
  }

}
