import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../shared/holiday.service';
import { UserListService } from '../shared/user-list.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(public HolidayService: HolidayService, public UserListService: UserListService) { }

  summary$;
  results: string[] = [];


  ngOnInit() {
    // filter out people with unbooked hols
    //loop through each hol, add up days taken - basic + service + xhol 
    //might want to kill this sub as changing user was fucking things up
    this.UserListService.getUserByEmail().mergeMap(user => {
      return this.HolidayService.getAllUserWithHolidays().mergeMap(data => {
        // console.log(data); //array 
        // console.log(user); //array
        return data.filter(team => team.team === user[0].team).map(item => {
          // console.log(item); //object          
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

      })
    }).subscribe(item => {
        this.summary$ = item;
        item.subscribe(test => {
          this.results.push(test);
        });
      });;




  }

}
