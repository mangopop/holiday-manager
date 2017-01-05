import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../shared/user';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  constructor() { }

  @Input() user;
  // this is called by onUpdate (wired in the html)
  @Output() updateUser: EventEmitter<User> = new EventEmitter<User>();

  // get diagnostic() { return JSON.stringify(this.user); }

  onSubmit(){
    this.onUpdate();
  }

  onUpdate() {
    console.log('update');    
    console.log(this.user);
    
    // this.onUpdateUser.emit(this.user);
  }

  ngOnInit() { 
    console.log(this.user);
    
  }

}
