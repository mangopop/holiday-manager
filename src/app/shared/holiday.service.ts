import { Injectable } from '@angular/core';
import { Holiday } from '../model/holiday';
import { LoginStatusService } from '../shared/login-status.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/takeWhile';
import * as moment from 'moment';

@Injectable()
export class HolidayService {

  // push/update/remove

  constructor(private af: AngularFire, private loginStatus: LoginStatusService) {
    this.loginStatus.getAuth().subscribe(auth => {
      if (auth != null) {
        this.uid = auth.uid;
      } else { console.log('error getting auth'); }
    });
  }

  // holiday: FirebaseListObservable<any[]>;
  holiday: FirebaseListObservable<any[]> = this.af.database.list('Holiday');
  holsPreserved$: FirebaseListObservable<any[]> = this.af.database.list('Holiday', { preserveSnapshot: true });
  uid;

  // THERE IS NOT POINT SUBSCRIBING HERE WE CANNOT RETURN THINGS AND CANNOT NO WHEN DONE

  updateHoliday(booking, status) {
    // console.log({ status: booking.status });
    // console.log(booking.$key);
    this.holiday.update(booking.$key, { status: status });
  }

  addHoliday(booking) {
    booking.userId = this.uid;
    // booking.key = booking.$key;
    booking.status = "pending";
    this.holiday.push(booking);
  }

  getHolidays() {
    // console.log(userId);

    // TODO: need to get holiday by userid at least
    // need to filter out holiday based on the fromDate
    return this.af.database.list('Holiday',
      {
        query: {
          orderByChild: 'userId',
          equalTo: this.uid
        }
      }
    );
  }

  getAllHolidays() {
    return this.af.database.list('Holiday');
  }

}
