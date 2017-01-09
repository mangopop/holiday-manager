import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../shared/holiday.service';
// import { Holiday } from '../model/holiday';
import { UserListService } from '../shared/user-list.service';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeAll';

/*
instance method
import 'rxjs/add/operator/merge';
const a = Observable.of(1);
a.merge(Observable.of(2)).subscribe(...);

static method
import 'rxjs/add/observable/merge';
Observable.merge(Observable.of(1), Observable.of(2)).subscribe(...);
*/

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
  // providers: [ HolidayService ]
})
export class ApproveComponent implements OnInit {

  constructor(public HolidayService: HolidayService, public UserListService: UserListService) { }

  // holidays$;
  // users$;
  mergeHolidays: { data: any; user: any; }[] = [];
  // bookings:Holiday; //array

  //change booking to approve 
  approve(booking) {
    this.HolidayService.updateHoliday(booking, 'approved');
  }

  //change booking to rejected
  //TODO what happens with the rejected holiday? this will clash unless deleted or updated
  reject(booking) {
    this.HolidayService.updateHoliday(booking, 'rejected');
  }

  ngOnInit() {
    // list of holidays with user in each one. will need to map over each holiday and filter if user 

    // this.mergeHolidays$ =
    //   this.UserListService.getUserByEmail()
    //   .mergeMap(data => this.HolidayService.getAllHolidaysAndUsers())
    //   .subscribe(data => console.log(data) );


    // this.UserListService.getUserByEmail()
    //   //we merge useremail to holusers and flatten. 
    //   // hol and user is an observable, with another on the prop user, this makes getting to it tricky
    //   .mergeMap(loggedInUser => {

    //   return this.HolidayService.getAllHolidaysAndUsers()
    // }) 

    // this.HolidayService.getAllHolidaysAndUsers2().subscribe(data => console.log(data));

    this.HolidayService.getAllHolidaysAndUsers().subscribe(data => data.user.subscribe(user => {
      // console.log(data);
      // console.log(user);
      if (data.loggedInUser[0].team === user.team) {
        this.mergeHolidays.push({ data: data, user: user });
      }

    }));




    //TEST
    // this.bookings = [
    //   {key:'-KYKAvI3Bwzly1XBwnxv', name:'Simon Norton',date:'21/05/2016',type:'Sick',slot:'Morning',status:'approved',comments:'Time off for visit'},
    //   {key:'-KYTlFBUn-zEOJW6KFOn', name:'Simon Norton',date:'22/05/2016',type:'Sick',slot:'Full',status:'approved',comments:'blah'},
    //   {name:'Chris Wilson',date:'21/05/2016',type:'Leave',slot:'Full',status:'rejected',comments:'blah'}
    // ]
  }

}
