import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../shared/holiday.service';
import { PublicHolService } from '../public-hol.service';
import { FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-dash-cal',
  templateUrl: './dash-cal.component.html',
  styleUrls: ['./dash-cal.component.css'],
  providers: [PublicHolService]
})
export class DashCalComponent implements OnInit {

  //http://kayaposoft.com/enrico/json/v1.0/?action=getPublicHolidaysForMonth&month=1&year=2016&country=eng
  //http://kayaposoft.com/enrico/json/v1.0/?action=getPublicHolidaysForYear&year=2016&country=eng
  constructor(public HolidayService: HolidayService, public PublicHol: PublicHolService) { }


  bankHol = [
    {
      "date": {
        "day": 1,
        "month": 1,
        "year": 2016,
        "dayOfWeek": 5
      },
      "localName": "New Year's Day",
      "englishName": "New Year's Day"
    },
    {
      "date": {
        "day": 7,
        "month": 1,
        "year": 2016,
        "dayOfWeek": 5
      },
      "localName": "New Year's Day",
      "englishName": "New Year's Day"
    },
    {
      "date": {
        "day": 1,
        "month": 12,
        "year": 2016,
        "dayOfWeek": 5
      },
      "localName": "New Year's Day",
      "englishName": "New Year's Day"
    }
  ]

  // bankHol$ = this.PublicHol.getBankHoliday();
  daysOfWeekTH: string[] = [];
  years: string[] = ['2017'];
  monthArr: any[] = [];
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  dates: any[];
  holidayDataSub;
  publicHolidaySub;

  // is this getting the correct year holidays?
  getHols(year) {
    const holidayData: FirebaseListObservable<any[]> = this.HolidayService.getHolidaysByUserId();
    this.holidayDataSub = holidayData.subscribe(data => {

      //TODO filter out sick and upaid
      this.dates = data
      .filter(filtObj => filtObj.type !== 'Sick' && filtObj.type !== 'Unpaid')
        .map(obj => obj.dates
          .map(dates => {
            return {
              date: dates.date,
              status: obj.status,
              key: obj.$key,
            }
          }))
        .reduce((prev, curr) => {
          return prev.concat(curr)
        }, []);

      //test
      // this.dates = [
      //   { date: '01-12-2016', key: '-KYKAvI3Bwzly1XBwnxv' },
      //   { date: '04-12-2016', key: '-KYKAvI3Bwzly1XBwnxv' }
      // ];

      // need to check if this is duplicating an already booked date, adding here assumes its booked, which don't want
      this.publicHolidaySub = this.PublicHol.getBankHoliday(year).subscribe(items => {
        // THIS SEEMS WRONG TO LOOP AGAIN? BUT THIS IS HOW THE TUTORIAL DOES IT?
        items.forEach(item => {
          // if < 0 add it
          if (this.dates.indexOf(item.date.day + '-' + item.date.month + '-' + item.date.year) < 0) {
            this.dates.push({ date: item.date.day + '-' + item.date.month + '-' + item.date.year, bankHol: true });
          }
        });
        // console.log(this.dates);
        this.createCal(year);
      });
      this.holidayDataSub.unsubscribe();
    });
  }


  createCal(year) {

    year = String(year);

    // clear all months each year
    this.monthArr = []; //array of months 1-12

    this.months.forEach(month => {

      // clears day each month
      var monthDayArr: any[] = []; //array of days of month 1-31
      var currentDay = moment(year + "-" + month).format("ddd");
      var monthPos = this.daysOfWeek.indexOf(currentDay);
      var monthDays = moment(year + "-" + month).daysInMonth();

      // bank holidays  
      // var monthAdj = month - 1;

      // if (typeof this.bankHol[monthAdj] != 'undefined') {
      //   monthDayArr.push({ day: this.bankHol[monthAdj].date.day, booked: false, bankHol: true });
      // }

      // build monthArr as array of object
      for (var i = 1; i < monthDays + 1; i++) {
        // monthDays is just number we have no date, so could split date and do comparison

        // working one day here ie 2016/01/01 so only should be one match
        // could we be working on too many dates? 
        var match = false;
        this.dates.forEach(dateObj => {
          var splitDate = dateObj.date.split('-');
          if (splitDate[2] === year) {
            // console.log('year matched');
            if (parseInt(splitDate[1]) === month) {
              // console.log('month matched');
              if (parseInt(splitDate[0]) === i) {
                // console.log('day matched');
                // we've found a match for this date, set booked and key              
                if (!dateObj.bankHol) {
                  monthDayArr.push({ day: i, booked: true, status: dateObj.status, key: dateObj.key });
                  // or bank hol
                } else {
                  monthDayArr.push({ day: i, bankHol: true });
                }
                // set for default-to-false skipping
                match = true;
              }
            }
          }
        });
        if (!match) {
          // TODO add some weeked logic
          monthDayArr.push({ day: i, booked: false });
        }
      }

      // shift days along by day index
      for (var i = 0; i < monthPos; i++) {
        monthDayArr.unshift('');
      }

      // add days to month
      this.monthArr.push(monthDayArr);
    });


    //create day headers
    var counter = 0;

    for (var i = 37; i > 0; i--) {
      if (counter > 6) counter = 0;
      this.daysOfWeekTH.push(this.daysOfWeek[counter]);
      counter++;
    }
  }

  ngOnInit() {
    this.getHols(String(new Date().getFullYear()));
    // console.log(this.PublicHol.getBankHoliday().subscribe(data => console.log(data)));

    // this.createCal();
  }

  ngOnDestroy() {
    // this.holidayDataSub.unsubscribe();
  }

}
