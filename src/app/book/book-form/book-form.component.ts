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
  message: string;
  ok2book: boolean = true;
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

  updateDaysTaken() {

    var fromDate = moment(this.booking.fromDate);
    var toDate = moment(this.booking.toDate);
    this.booking.daysTaken = 0;
    
    // if Unpaid is not selected calc daysTaken
    if (this.booking.type !== 'Unpaid') {
      // one day selected
      if (fromDate.isSame(toDate)) {
        // check for half day
        console.log(this.booking.dates[0].slot); //this is picking up last data
        
        if (this.booking.dates[0].slot !== 'Full') {
          console.log('add single half day');
          this.booking.daysTaken = .5;
        } else {
          console.log('add single day');
          this.booking.daysTaken = 1;
        }

        // we have should have a range of more than 1 so we can loop
      } else {
        this.booking.dates.forEach(item => {
          // console.log(item);

          if (item.slot !== 'Full') {
            console.log('add half day');
            this.booking.daysTaken += .5;
          } else {
            console.log('add day');
            this.booking.daysTaken++;
          }
        });
        // this.booking.daysTaken = this.booking.dates.length;
      }
    }

  }

  //get each date selected and then make this appear in select input loop! 
  updateRange(range = null) {
    this.ok2book = true;
    var fromDate = moment(this.booking.fromDate);
    var toDate = moment(this.booking.toDate);
    // this.booking.daysTaken = 0;

    // this.booking.daysTaken = fromDate.diff(toDate, 'days'); //still counts weekends
    // this.booking.daysTaken = Math.abs(this.booking.daysTaken) + 1;

    //for each week day, add to array
    this.booking.dates = this.enumerateDaysBetweenDates(moment(this.booking.fromDate), moment(this.booking.toDate));
    this.updateDaysTaken();

    let sub = this.HolidayService.getAllHolidays().subscribe(data => {
      let compareFromDate = fromDate;
      let compareToDate = toDate;
      data.forEach(element => {
        let fromDate2 = moment(element.fromDate2).subtract(1, 'days');
        let toDate2 = moment(element.toDate2).add(1, 'days');

        // if we find any dates bookHol is turned on
        if (compareToDate.isBetween(fromDate2, toDate2) || compareFromDate.isBetween(fromDate2, toDate2)) {
          this.ok2book = false;
        }
      });

      sub.unsubscribe();
    });


  }

  onSubmit() {
    console.log('submit');
    // this.ok2book = this.HolidayService.checkAvailability(this.booking,range);
    this.booking.status = 'pending';
    this.HolidayService.addHoliday(this.booking);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.booking); }

  ngOnInit() {
    // get the id from route params
    this.route.params.subscribe((params: Params) => {
      // let id = +params['id']; // (+) converts string 'id' to a number
      let id = params['id'];
      // console.log(id);

      if (id) {

        const userId = this.LoginStatus.getStatus();
        console.log(userId);

        const bookingData = this.HolidayService.getHolidays(userId.uid);

        // this will return multiple bookings
        bookingData.subscribe(data => {
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
