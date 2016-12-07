import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dash-cal',
  templateUrl: './dash-cal.component.html',
  styleUrls: ['./dash-cal.component.css']
})
export class DashCalComponent implements OnInit {

  constructor() { }

  daysOfWeekTH = [];
  years = ['2016'];
  monthArr = [];
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  //test data
  dates = ['2016/01/01', '2016/01/04'];

  createCal() {
    this.years.forEach(year => {

      var yearDates = this.dates.filter(value => {
        return value.indexOf(year) >= 0;
      })


      // clear all months each year
      this.monthArr = [];

      this.months.forEach(month => {

        // clears day each month
        var monthDayArr = [];
        var currentDay = moment(year + "-" + month).format("ddd");
        var monthPos = this.daysOfWeek.indexOf(currentDay);
        var monthDays = moment(year + "-" + month).daysInMonth();

        // add days
        for (var i = 1; i < monthDays + 1; i++) {
          // monthDays is just number we have no date, so could split date and do comparison

          // working one day here ie 2016/01/01 so only should be one match
          // could we be working on too many dates? 
          var match = false;
          this.dates.forEach(date => {                   
            var splitDate = date.split('/');   
            if (splitDate[0] === year) {
              console.log('year matched');
              if (parseInt(splitDate[1]) === month) {
                console.log('month matched');
                if (parseInt(splitDate[2]) === i) {
                  console.log('day matched');   
                  // we've found a match for this date, set booked                 
                  monthDayArr.push({ day: i, booked: true });
                  // set for default-to-false skipping
                  match = true;
                }
              }
            }
          });
          if(!match){
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
    this.createCal();
  }

}
