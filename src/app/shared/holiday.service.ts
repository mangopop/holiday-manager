import { Injectable } from '@angular/core';
import { Holiday } from '../model/holiday';
import { LoginStatusService } from '../shared/login-status.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/add/operator/takeWhile';
import * as moment from 'moment';

@Injectable()
export class HolidayService {

  // push/update/remove

  constructor(private af: AngularFire, private loginStatus: LoginStatusService) { }

  // holiday: FirebaseListObservable<any[]>;
  holiday: FirebaseListObservable<any[]> = this.af.database.list('Holiday');
  holsPreserved$: FirebaseListObservable<any[]> = this.af.database.list('Holiday', { preserveSnapshot: true });
  ok2book = true;

  // THERE IS NOT POINT SUBSCRIBING HERE WE CANNOT RETURN THINGS AND CANNOT NO WHEN DONE

  updateHoliday(booking, status) {
    // console.log({ status: booking.status });
    // console.log(booking.$key);
    this.holiday.update(booking.$key, { status: status });
  }

  addHoliday(booking) {
    let status = this.loginStatus.getStatus()
    booking.userId = status.uid;
    // booking.key = booking.$key;
    booking.status = "pending";
    this.holiday.push(booking);
  }

  // checkAvailability(booking, range): any {
  //   console.log('call check');

  //   this.ok2book = true;
  //   let allHolidays$: any = this.getAllHolidays();
  //   let compareFromDate = moment(booking.fromDate);
  //   let compareToDate = moment(booking.toDate);
  //   // var bookHol: Boolean = true;
  //   // let holidays;

  //   // this is going to return until we have date conflict, then we return false. 
  //   // the sub will output while true (no conflict), but not complete. 
  //   // the sub will complete if we have conflict but not output.
  //   // so call book() on complete?
  //   // so complete if there are no conflicts, which means return false unless we find true
  //   // if we have one conflict set to true so doesn't ever complete and call book
  //   // var condition = allHolidays$.takeWhile(ev => {
  //   //   console.log('takeWhile');
  //   //   console.log(ev);
  //   //   var result = false;
  //   //   ev.forEach(element => {
  //   //     let fromDate = moment(element.fromDate).subtract(1, 'days');
  //   //     let toDate = moment(element.toDate).add(1, 'days');
  //   //     // console.log(moment(fromDate,'DD-MM-YY'),moment(toDate,'DD-MM-YY'));
  //   //     if (range === 'from') {
  //   //       console.log('dateFrom');
  //   //       if (compareFromDate.isBetween(fromDate, toDate)) {
  //   //         console.log('ok2book date conflict');
  //   //         result = true;
  //   //       }
  //   //     }
  //   //     if (range === 'to') {
  //   //       console.log('dateTo');
  //   //       if (compareToDate.isBetween(fromDate, toDate)) {
  //   //         console.log('ok2book date conflict');
  //   //         result = true;
  //   //       }
  //   //     }
  //   //   });

  //   //   //to complete return false
  //   //   console.log(result);
  //   //   return result;

  //   // });

  //   let sub = allHolidays$.subscribe(
  //     data => {
  //       console.log('sub');

  //       console.log(data);

  //       data.forEach(element => {
  //         //shift dates as no inclusive
  //         let fromDate = moment(element.fromDate).subtract(1, 'days');
  //         let toDate = moment(element.toDate).add(1, 'days');
  //         // console.log(moment(fromDate,'DD-MM-YY'),moment(toDate,'DD-MM-YY'));

  //         // if we find any dates bookHol is turned on
  //         if (compareFromDate.isBetween(fromDate, toDate) || compareToDate.isBetween(fromDate, toDate)) {
  //           console.log('ok2book false');

  //         }
  //       });

  //       sub.unsubscribe();
  //     },
  //     err => console.log('err'),
  //     () => console.log('book hol'),
  //   );
  // }

  getHolidays(userId) {
    // console.log(userId);

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
