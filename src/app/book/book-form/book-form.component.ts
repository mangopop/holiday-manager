import { Component, OnInit } from '@angular/core';
import { Holiday } from '../../model/holiday';
import * as moment from 'moment';
// declare var moment: any;

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  constructor() { }

  // dates = [moment('D/M/YYYY'),moment('D/M/YYYY').add(1,'days')];
  dates: string[];
  dayDiff: number;

  // public booking:Holiday; //get undefined when trying to add to it in form
  public booking = new Holiday();

  public types = [
    'Paid',
    'Unpaid',
    'Leave', 
    'Sick'
  ];

  public lengths = [
    'Full',
    'Morning',
    'Afternoon',
  ];

  enumerateDaysBetweenDates(startDate, endDate) {
    var now = startDate, dates = [];
    var format = 'D/M/YYYY';
    //console.log(now.format(format), endDate.format(format));

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
    this.dayDiff = moment(this.booking.fromDate).diff(moment(this.booking.toDate), 'days');
    //for each week day, add to array
    this.dates = this.enumerateDaysBetweenDates(moment(this.booking.fromDate), moment(this.booking.toDate));
    this.booking.dates = this.dates;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.booking); }

  ngOnInit() {
  }

}
