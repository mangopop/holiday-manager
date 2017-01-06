import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../shared/holiday.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(public HolidayService: HolidayService) { }

  summary$;
  results: string[] = [];


  ngOnInit() {
    // filter out people with unbooked hols
    //loop through each hol, add up days taken - basic + service + xhol 

    this.HolidayService.getAllUserWithHolidays().mergeMap(data => {
      console.log(data);

      return data.map(item => {
        return item.holiday.map(hol => {
          var holleft = 20 - hol.reduce((prev, curr) => prev + curr.daysTaken, 0)
          if (holleft > 0) {
            return {
              firstname: item.firstname,
              surname: item.surname,
              hol: holleft
            }
          }

        })
      });

    }).subscribe(item => {
      this.summary$ = item;
      item.subscribe(test => {
        console.log(test);        
        this.results.push(test);
      });
    });


  }

}
