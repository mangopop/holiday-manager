import { Injectable } from '@angular/core';
import { Holiday } from '../model/holiday';
import { LoginStatusService } from '../shared/login-status.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class HolidayService {

  // push/update/remove

  constructor(private af: AngularFire, private loginStatus: LoginStatusService) { }

  // holiday: FirebaseListObservable<any[]>;
  holiday: FirebaseListObservable<any[]> = this.af.database.list('Holiday');


  updateHoliday(booking,status){
    console.log({status:booking.status});    
    console.log(booking.$key);    
    this.holiday.update(booking.$key,{status:status});
  }

  addHoliday(booking) {
    // console.log('adding holiday');
    // console.log(booking);
    // console.log(this.loginStatus.getStatus());
    let status = this.loginStatus.getStatus()
    booking.userId = status.uid;
    booking.key = booking.key;
    booking.approved = false;
    booking.rejected = false;

    this.holiday.push(booking);
  }

  getHolidays(userId) {
    console.log(userId);
    
    // TODO: need to get holiday by userid at least
    // need to filter out holiday based on the fromDate
    return this.af.database.list('Holiday',
      {
        query: {
          orderByChild: 'userId',
          equalTo: userId
        }
      }
    );
  }

  getAllHolidays() {
    return this.af.database.list('Holiday');
  }

}
