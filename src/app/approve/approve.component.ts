import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../shared/holiday.service';
import { Holiday } from '../model/holiday';
import { UserListService } from '../shared/user-list.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/combineLatest';

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

  constructor(public HolidayService:HolidayService,public UserListService:UserListService) { }

  holidays$;
  users$;
  mergeHolidays$;
  bookings:Holiday; //array

  //change booking to approve 
  approve(booking){
    this.HolidayService.updateHoliday(booking,'approved');
  }

  //change booking to rejected
  //TODO what happens with the rejected holiday? this will clash unless deleted or updated
  reject(booking){
    this.HolidayService.updateHoliday(booking,'rejected');
  }

  ngOnInit() {
    // build list of bookings. 
    this.holidays$ = this.HolidayService.getAllHolidays();
    this.users$ = this.UserListService.getUsers();
    this.mergeHolidays$ = this.HolidayService.getAllHolidaysAndUsers();

    //TEST
    // this.bookings = [
    //   {key:'-KYKAvI3Bwzly1XBwnxv', name:'Simon Norton',date:'21/05/2016',type:'Sick',slot:'Morning',status:'approved',comments:'Time off for visit'},
    //   {key:'-KYTlFBUn-zEOJW6KFOn', name:'Simon Norton',date:'22/05/2016',type:'Sick',slot:'Full',status:'approved',comments:'blah'},
    //   {name:'Chris Wilson',date:'21/05/2016',type:'Leave',slot:'Full',status:'rejected',comments:'blah'}
    // ]
  }

}
