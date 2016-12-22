import { Injectable } from '@angular/core';
import { Holiday } from '../model/holiday';
import { LoginStatusService } from '../shared/login-status.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/concat';
import * as moment from 'moment';

// singleton class?
@Injectable()
export class HolidayService {

  // push/update/remove

  // on first call this isn't being fired in time
  constructor(private af: AngularFire, private loginStatus: LoginStatusService) {
    this.getLogin();
  }

  // holiday: FirebaseListObservable<any[]>;
  holiday: FirebaseListObservable<any[]> = this.af.database.list('Holiday');
  // holsPreserved$: FirebaseListObservable<any[]> = this.af.database.list('Holiday', { preserveSnapshot: true });
  uid;
  subject;

  // NOTES...
  // THERE IS NOT POINT SUBSCRIBING HERE WE CANNOT RETURN THINGS AND CANNOT KNOW WHEN DONE
  // move async operations out of subscribe, it's not made for async operations.

  updateHoliday(booking, status) {
    // console.log({ status: booking.status });
    // console.log(booking.$key);
    this.holiday.update(booking.$key, { status: status });
  }

  addHoliday(booking) {
    booking.userId = this.uid;
    // booking.key = booking.$key;
    booking.status = "pending";
    return this.holiday.push(booking).then(resolve => {
      console.log('all good');
      return true;
    }, reject => {
      console.log('error');
      return false;
    })
      .catch(reject => {
        console.log('catch');
      });;
  }

  getHolidays() {
    console.log('getHolidays');
    console.log(this.subject);
    this.subject.subscribe({
      next: (v) => console.log('value: ' + v)
    });

    // var $login = this.loginStatus.getAuth();

    return this.af.database.list('Holiday',
      {
        query: {
          orderByChild: 'userId',
          equalTo: this.subject //how to this receive the id out of this? Somehow firebase extracts as would a subcription
        }
      }
    );
  }



  getAllHolidays() {
    return this.af.database.list('Holiday');
  }

  getLogin() {
    this.subject = new Subject();
    this.loginStatus.getAuth().subscribe(
      auth => {
        console.log(auth);
        if (auth != null) {
          // push value to observer
          this.subject.next(auth.uid);
          this.uid = auth.uid;
        }
        else { console.log('error getting auth'); }
      },
      err => console.log('error'),
      () => {
        console.log('complete');
      },
    );
  }

}
