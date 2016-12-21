import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Holiday } from '../../model/holiday';
// import { Holiday } from '../../model/holiday.interface';
import { HolidayService } from '../../shared/holiday.service';
import { ConstantsService } from '../../shared/constants.service';
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

  constructor(public ConstantsService: ConstantsService, public LoginStatus: LoginStatusService, public HolidayService: HolidayService, private route: ActivatedRoute, private router: Router) { }

  // dates = [moment('D/M/YYYY'),moment('D/M/YYYY').add(1,'days')];
  // dates: string[];
  dayDiff: number;
  message: string;
  ok2book: boolean = true;

  uid: string;
  constants$: FirebaseListObservable<any>;
  basic: number;
  daysLeft: number;
  daysTaken: number;
  daysPending: number;
  bookingData$: FirebaseListObservable<any>;
  bookingDataSub;
  constantsSub;
  holidayServiceSub;

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

  // ----------------- GET USER HOLIDAY DATA ------------------- //

  // not returning this in a service is a pain.
  // we could move this up to app module, then move values down?

  getConstants() {
    this.constantsSub = this.ConstantsService.getConstants().subscribe(data => {
      this.basic = data[0].$value;
    });
  }

  getHolidayInfo() {
    this.bookingData$ = this.HolidayService.getHolidays();
    //array of matching bookings for user      
    this.bookingDataSub = this.bookingData$.subscribe(data => {
      // approved panel hols      
      this.daysTaken = data.filter(hol => hol.status === 'approved').reduce((pre, cur) => pre + cur.daysTaken, 0);
      this.daysLeft = this.basic - this.daysTaken;
      //  pending panel hols
      this.daysPending = data.filter(hol => hol.status === 'pending').reduce((pre, cur) => pre + cur.daysTaken, 0);
      this.bookingDataSub.unsubscribe();// this stopped the pyramid effect when we couldn't do it onDestory
    });

  }

  // ----------------- CALCULATE BOOKING ------------------- //

  getSelectedDates() {
    return {
      fromDate: moment(this.booking.fromDate),
      toDate: moment(this.booking.toDate)
    }
  }

  updateDaysTaken() {
    var selectedDates = this.getSelectedDates();
    // var fromDate = moment(this.booking.fromDate);
    // var toDate = moment(this.booking.toDate);
    this.booking.daysTaken = 0;

    // if Unpaid is not selected calc daysTaken
    if (this.booking.type !== 'Unpaid') {
      // one day selected
      if (selectedDates.fromDate.isSame(selectedDates.toDate)) {
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
    this.compareDates();
  }

  //get each date selected and then make this appear in select input loop! 
  updateRange(range = null) {
    // this.booking.daysTaken = 0;

    // this.booking.daysTaken = fromDate.diff(toDate, 'days'); //still counts weekends
    // this.booking.daysTaken = Math.abs(this.booking.daysTaken) + 1;

    //for each week day, add to array
    this.booking.dates = this.enumerateDaysBetweenDates(moment(this.booking.fromDate), moment(this.booking.toDate));
    this.updateDaysTaken();
    this.compareDates();

  }

  compareDates() {
    this.ok2book = true;
    var selectedDates = this.getSelectedDates();
    this.bookingData$.subscribe(data => {
      let compareFromDate = selectedDates.fromDate;
      let compareToDate = selectedDates.toDate;
      data.forEach(element => {

        let fromDate2 = moment(element.fromDate).subtract(1, 'days');
        let toDate2 = moment(element.toDate).add(1, 'days');

        // console.log(fromDate2,toDate2,compareFromDate);        

        // if we find any dates bookHol is turned off
        if (compareFromDate.isBetween(fromDate2, toDate2) || compareToDate.isBetween(fromDate2, toDate2)) {
          this.message = 'Booking Conflict';
          this.ok2book = false;
        }

        // alert and disable button if don't have days left
        if (this.daysLeft < this.booking.daysTaken) {
          this.message = 'You do not have enough holiday';
          this.ok2book = false;
        }

      });
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
    this.getConstants();
    this.getHolidayInfo();
    // get the id from route params
    this.route.params.subscribe((params: Params) => {
      // let id = +params['id']; // (+) converts string 'id' to a number
      let id = params['id'];
      // console.log(id);

      if (id) {

        const userId = this.LoginStatus.getStatus();
        console.log(userId);

        const bookingData = this.HolidayService.getHolidays();

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

  ngOnDestroy() {

    this.constantsSub.unsubscribe();
    this.bookingDataSub.unsubscribe();

  }
}
