import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../shared/holiday.service';
import { UserListService } from '../shared/user-list.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import * as _ from 'lodash';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor(public HolidayService: HolidayService, public UserListService: UserListService) { }

  summary$: any;
  // results: string[] = [];
  results: any[] = [];

  ngOnInit() {
    // filter out people with unbooked hols
    // loop through each hol, add up days taken - basic + service + xhol 
    // might want to kill this sub as changing user was fucking things up
    // mergemap helps us return just one Observable for subscription
    // assining this to a sub var only shows the last value?
    this.UserListService.getUserByEmail().mergeMap(user => {
       //mergemap on the final function will not return all values       
      return this.HolidayService.getAllUserWithHolidays().map(data => {
        // console.log(data); //object
        return data
        .filter(item => item.hol > 0)
        .map(item => {
              return {
                firstname:item.firstname,
                surname: item.surname,
                holiday: item.hol
              }
        })
        // console.log(user); //array
        // if(data.item.team === user[0].team){ // mapped is still returning undefined?
            //  return {
            //     firstname:data.item.firstname,
            //     surname: data.item.surname,
            //     holiday: data.hol
            //   }
        // }
      })
      // .do(log => console.log(log)) // mapped data
    })
    .do(log => console.log(log)) // also mapped data as it's merged?
    .subscribe( item => this.results.push(item[0]))
    
  }
}