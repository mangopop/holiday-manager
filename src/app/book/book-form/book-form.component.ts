import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Holiday } from '../../model/holiday';
// import { Holiday } from '../../model/holiday.interface';
import { HolidayService } from '../../shared/holiday.service';
import { ConstantsService } from '../../shared/constants.service';
import { UserListService } from '../../shared/user-list.service';
// import { LoginStatusService } from '../../shared/login-status.service';

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

  constructor(
    public ConstantsService: ConstantsService,
    public HolidayService: HolidayService,
    public UserListService: UserListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // dates = [moment('D/M/YYYY'),moment('D/M/YYYY').add(1,'days')];
  // dates: string[];
  dayDiff: number;
  message: string;
  ok2book: boolean = true;

  uid: string;
  constants$: FirebaseListObservable<any>;
  basic: number = 0;
  daysLeft: number = 0;
  daysTaken: number = 0;
  daysPending: number = 0;
  // bookingData$: FirebaseListObservable<any>;
  service: number = 0;

  bookingDataSub;
  constantsSub;
  holidayServiceSub;
  userDataSub;

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

  //TODO: remove sick option unless mananger

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

  filterTypes(){
    this.UserListService.getUserByEmail().subscribe(data => {      
      if(!data[0].manager) this.types.splice(3,1);      
    });
  }

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


  getHoliday(){
    this.HolidayService.getHolidayInfo().subscribe(data =>{      
      this.daysLeft = data.daysLeft();
      this.daysPending = data.daysPending;
      this.daysTaken = data.daysTaken;
    });
  }

  getConstants() {
    this.constantsSub = this.ConstantsService.getConstants().subscribe(data => {
      this.basic = data[0].$value;
    });
  }

  // NOTE: CAN WE NOT MAP OVER THIS AND MAINTAIN OBSERVABLE BEFORE RETURNING TO REDUCE COMPONENT CODE?
  getHolidayInfo() {
    // this.bookingData$ = this.HolidayService.getHolidaysByUserId();
    //array of matching bookings for user      
    this.bookingDataSub = this.HolidayService.getHolidaysByUserId().subscribe(data => {
      var currentYear = new Date().getFullYear();
      this.daysTaken = data.filter(hol => {
        var from = new Date(hol.fromDate).getFullYear();
        var to = new Date(hol.toDate).getFullYear();
        return hol.status === 'approved'
        // if any from or to data matches currentyear or currentyear + 1
        && (from === currentYear || to === currentYear || from === currentYear + 1 || to === currentYear + 1)
      }).reduce((pre, cur) => pre + cur.daysTaken, 0);
      this.daysPending = data.filter(hol => {
        var from = new Date(hol.fromDate).getFullYear();
        var to = new Date(hol.toDate).getFullYear();
        return hol.status === 'pending'
        // if any from or to data matches currentyear or currentyear + 1
        && (from === currentYear || to === currentYear || from === currentYear + 1 || to === currentYear + 1)
      }).reduce((pre, cur) => pre + cur.daysTaken, 0);

      this.userDataSub = this.UserListService.getUserByEmail().subscribe(data => {
        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth();
        var startDate = new Date(data[0].startDate)
        var startYear = startDate.getFullYear();
        // calculate service
        var served = currentYear - startYear;
        if (served < 5) { this.service = 0 }
        if (served >= 5 && served <= 9) { this.service = 1 }
        if (served >= 10 && served <= 14) { this.service = 3 }
        if (served >= 15) { this.service = 5 }

        var xhol = data[0].hasOwnProperty('xhol') || 0;

        // don't use basic if user has start in same year
        if (currentYear === startYear) {
          this.daysLeft = Math.floor(((currentMonth - startDate.getMonth() + 1) / 12) * this.basic) - this.daysTaken + this.service + xhol;
          // this.daysLeft = Math.floor((currentMonth - startDate.getMonth() + 1) * 1.66);
        } else {
          this.daysLeft = this.basic - this.daysTaken + this.service + xhol;
        }
        this.userDataSub.unsubscribe();
      });
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
    this.booking.daysTaken = 0;

    // if Unpaid is not selected calc daysTaken
    // FIXME: why can't we use !=='Sick'
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
    //for each week day, add to array
    this.booking.dates = this.enumerateDaysBetweenDates(moment(this.booking.fromDate), moment(this.booking.toDate));
    this.updateDaysTaken();
    this.compareDates();

  }

  // TODO not taking into account service days
  compareDates() {
    this.ok2book = true;
    var selectedDates = this.getSelectedDates();
    this.HolidayService.getHolidaysByUserId().subscribe(data => {
      data.forEach(element => {
        let fromDate2 = moment(element.fromDate).subtract(1, 'days');
        let toDate2 = moment(element.toDate).add(1, 'days');

        // if we find any dates bookHol is turned off
        if (selectedDates.fromDate.isBetween(fromDate2, toDate2) || selectedDates.toDate.isBetween(fromDate2, toDate2)) {
          this.message = 'Booking Conflict';
          this.ok2book = false;
        }

        // subscribing in another sub is a bit slow here.
        // this.HolidayService.testMerge().subscribe(data => {
        //   console.log(data);

        // alert and disable button if don't have days left
        if (this.daysLeft < this.booking.daysTaken) {
          this.message = 'You do not have enough holiday';
          this.ok2book = false;
        }
        // });


      });
    });
  }

  onSubmit() {
    console.log('submit');
    // this.ok2book = this.HolidayService.checkAvailability(this.booking,range);
    this.booking.status = 'pending';
    if (!this.HolidayService.addHoliday(this.booking)) {
      //message
    } else {
      this.booking = new Holiday();
      this.ok2book = true;
      //TODO pop up a 'Booked' notification
    }

  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.booking); }

  ngOnInit() {
    this.filterTypes();
    this.getConstants();
    this.getHolidayInfo();
    // get the id from route params
    this.route.params.subscribe((params: Params) => {
      // let id = +params['id']; // (+) converts string 'id' to a number
      let id = params['id'];
      // console.log(id);

      if (id) {

        // const userId = this.LoginStatus.getStatus();
        // console.log(userId);

        const bookingData = this.HolidayService.getHolidaysByUserId();

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
