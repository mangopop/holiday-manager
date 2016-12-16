import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Holiday } from '../../model/holiday';
// import { Holiday } from '../../model/holiday.interface';
import { HolidayService } from '../../shared/holiday.service';
import { LoginStatusService } from '../../shared/login-status.service';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/first';

import * as moment from 'moment';
// declare var moment: any;

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  // providers: [HolidayService,LoginStatusService]
})
export class BookFormComponent implements OnInit {

  constructor(public LoginStatus: LoginStatusService, public HolidayService: HolidayService, private route: ActivatedRoute, private router: Router) { }

  // dates = [moment('D/M/YYYY'),moment('D/M/YYYY').add(1,'days')];
  // dates: string[];
  dayDiff: number;

  // we can fill in all values, or none. But then the form thinks it is filled in
  public booking = new Holiday();
  // booking = {
  //   userId: '',
  //   type: 'Sick',
  //   dates: [
  //     { date: '2016-12-01', slot: 'Morning' },
  //     { date: '2016-12-02', slot: 'Morning' },
  //     { date: '2016-12-05', slot: 'Afternoon' }
  //   ],
  //   daysTaken: 3,
  //   fromDate: '2016-01-01',
  //   toDate: '2016-01-05'
  // }

  public types = [
    'Paid',
    'Unpaid',
    'Leave',
    'Sick'
  ];

  public lengthsObj = [
    { slot: 'Afternoon' },
    { slot: 'Full' },
    { slot: 'Morning' }
  ];

  enumerateDaysBetweenDates(startDate, endDate) {
    var now = startDate, dates = [];
    var format = 'D-M-YYYY';

    while (now.isSameOrBefore(endDate)) {
      if (now.day() !== 6 && now.day() !== 0) {
        dates.push({ date: now.format(format), slot: 'Full' });
      }
      now.add(1, 'days');
    }

    return dates;
  };

  //get each date selected and then make this appear in select input loop! 
  updateRange() {
    this.booking.daysTaken = moment(this.booking.fromDate).diff(moment(this.booking.toDate), 'days');
    //for each week day, add to array
    this.booking.dates = this.enumerateDaysBetweenDates(moment(this.booking.fromDate), moment(this.booking.toDate));
    // this.booking.dates = this.dates;
  }

  onSubmit() {
    console.log('submit');
    this.HolidayService.addHoliday(this.booking);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.booking); }

  ngOnInit() {
    // get the id from route params
    this.route.params.subscribe((params: Params) => {
      // let id = +params['id']; // (+) converts string 'id' to a number
      let id = params['id'];
      console.log(id);

      if (id) {

        const userId = this.LoginStatus.getStatus();
        console.log(userId);
        
        const bookingData = this.HolidayService.getHolidays(userId.uid);

        // this will return multiple bookings
        bookingData.first().subscribe(data => {
          console.log(data);
          // filter out single booking using key
          const book = data.filter(obj => obj.$key === id);
          console.log(book);
          this.booking = book[0];

        });
      }
    });
  }

}
