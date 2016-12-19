import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../shared/holiday.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
  // providers: [ HolidayService ]
})
export class ApproveComponent implements OnInit {

  constructor(public HolidayService:HolidayService) { }

  holidays$;
  bookings; //array

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
    // build list of bookings. Will have to attach name.
    this.holidays$ = this.HolidayService.getAllHolidays();

    //TEST
    this.bookings = [
      {key:'-KYKAvI3Bwzly1XBwnxv', name:'Simon Norton',date:'21/05/2016',type:'Sick',slot:'Morning',status:'approved',comments:'Time off for visit'},
      {key:'-KYTlFBUn-zEOJW6KFOn', name:'Simon Norton',date:'22/05/2016',type:'Sick',slot:'Full',status:'approved',comments:'blah'},
      {name:'Chris Wilson',date:'21/05/2016',type:'Leave',slot:'Full',status:'rejected',comments:'blah'}
    ]
  }

}
