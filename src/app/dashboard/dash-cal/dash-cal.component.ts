import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../../shared/holiday.service';
import { LoginStatusService } from '../../shared/login-status.service';
import { FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'app-dash-cal',
  templateUrl: './dash-cal.component.html',
  styleUrls: ['./dash-cal.component.css']
})
export class DashCalComponent implements OnInit {

  constructor(public LoginStatus: LoginStatusService, public HolidayService: HolidayService) { }

  daysOfWeekTH: string[] = [];
  years: string[] = ['2016'];
  monthArr: any[] = [];
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  dates: any[];


  //get holidays
  getHols() {
    const holidayData: FirebaseListObservable<any[]> = this.HolidayService.getHolidays(this.LoginStatus.getStatus().uid);
    holidayData.subscribe(data => {

      //go through each booking and gather 'dates' into a clean date array
      const nestedDates = data.map(obj => obj.dates.map(dates => {
        return {
          date: dates.date,
          key: obj.$key,
        }
      }));
      this.dates = nestedDates.reduce((prev, curr) => {
        return prev.concat(curr)
      }, []);
      //test
      // this.dates = [
      //   { date: '01-12-2016', key: '-KYKAvI3Bwzly1XBwnxv' },
      //   { date: '04-12-2016', key: '-KYKAvI3Bwzly1XBwnxv' }
      // ];
      console.log(this.dates);
      this.createCal();
    });

  }


  createCal() {
    this.years.forEach(year => {


      // var yearDates = this.dates.filter(value => {
      //   return value.indexOf(year) >= 0;
      // })


      // clear all months each year
      this.monthArr = [];

      this.months.forEach(month => {

        // clears day each month
        var monthDayArr: any[] = [];
        var currentDay = moment(year + "-" + month).format("ddd");
        var monthPos = this.daysOfWeek.indexOf(currentDay);
        var monthDays = moment(year + "-" + month).daysInMonth();

        // add days
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
                  monthDayArr.push({ day: i, booked: true, key:dateObj.key });
                  // set for default-to-false skipping
                  match = true;
                }
              }
            }
          });
          if (!match) {
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
    this.getHols();
    // this.createCal();

  }

}
