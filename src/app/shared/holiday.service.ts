import { Injectable } from '@angular/core';
import { Holiday } from '../model/holiday';
import { LoginStatusService } from '../shared/login-status.service';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class HolidayService {

  //push/update/remove

  constructor(private af: AngularFire, private loginStatus:LoginStatusService) { }

  holiday: FirebaseListObservable<any[]>;

  addHoliday(booking){
    // console.log('adding holiday');
    // console.log(booking);
    // console.log(this.loginStatus.getStatus());
    let status = this.loginStatus.getStatus()
    booking.userId =  status.uid;
    
    
    const item = this.af.database.list('Holiday');
    item.push(booking);
  }

}
