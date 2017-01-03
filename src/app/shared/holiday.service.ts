import { Injectable } from '@angular/core';
import { Holiday } from '../model/holiday';
import { LoginStatusService } from '../shared/login-status.service';
import { UserListService } from '../shared/user-list.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

// singleton class?
@Injectable()
export class HolidayService {

  // push/update/remove

  // constructor isn't called a second time!?
  // on first call this isn't being fired in time
  constructor(private af: AngularFire, private loginStatus: LoginStatusService, private UserList: UserListService) {
    this.getLogin();
    console.log('holiday contructor called');
  }

  // holiday: FirebaseListObservable<any[]>;
  holiday: FirebaseListObservable<any[]> = this.af.database.list('Holiday');
  users: FirebaseObjectObservable<any[]> = this.af.database.object('Users');
  // holsPreserved$: FirebaseListObservable<any[]> = this.af.database.list('Holiday', { preserveSnapshot: true });
  uid;
  user$; // can we get this using getUser() ? no because it uses the user key
  userIdKey;
  userEmail;
  subject;

  // NOTES...
  // THERE IS NOT POINT SUBSCRIBING HERE WE CANNOT RETURN THINGS AND CANNOT KNOW WHEN DONE
  // move async operations out of subscribe, it's not made for async operations.

  updateHoliday(booking, status) {
    // console.log({ status: booking.status });
    // console.log(booking.$key);
    this.holiday.update(booking.$key, { status: status });
  }

  // TODO: add the key here
  addHoliday(booking) {
    booking.userId = this.uid;
    // can only identify by email? so do we grab email from auth and use this to query?
    this.UserList.getUserByEmail(this.userEmail).subscribe(data => {
      booking.userIdKey = data[0].$key;
      booking.status = "pending";
      // TODO: probably don't need to return
      this.holiday.push(booking).then(resolve => {
        console.log('all good');
        return true;
      }, reject => {
        console.log('error');
        return false;
      })
      .catch(reject => {
        console.log('catch');
      });
    });
  }

  getHolidays() {
    // console.log('getHolidays');
    // when we get auth this is broadcasted and we recieve here
    // we are listening here, only getlogin is calling this
    this.subject.subscribe({
      next: (v) => console.log('value: ' + v)
    });

    // var $login = this.loginStatus.getAuth();

    return this.af.database.list('Holiday',
      {
        query: {
          orderByChild: 'userId',
          equalTo: this.uid
          // equalTo: this.subject //how to this receive the id out of this? Somehow firebase extracts as would a subcription
        }
      }
    );
  }

  getAllHolidays() {
    return this.holiday;
  }

  getAllHolidaysAndUsers() {
    return this.holiday.map(items => {
      // console.log(items);
      for (let item of items) {
        // could run a query on the loginId tp find the user if it was added to the holiday
        item.user = this.af.database.object(`/User/${item.userIdKey}`);
      }
      return items;
    });
  }

  getLogin() {
    this.subject = new Subject();
    this.loginStatus.getAuth().subscribe(
      auth => {
        console.log(auth);
        if (auth != null) {
          // push value to observer
          this.subject.next(auth.uid);
          // set in global 
          this.uid = auth.uid;
          this.userEmail = auth.auth.email;
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
