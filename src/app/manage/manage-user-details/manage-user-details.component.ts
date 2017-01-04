import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../../shared/user';
// import { UserListService } from '../../shared/user-list.service'; // i've imported this in module!? do that mean I just don't add it under @component
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-manage-user-details',
  templateUrl: './manage-user-details.component.html',
  styleUrls: ['./manage-user-details.component.css']
})
export class ManageUserDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  @Input() user;
  @Input() newUser;
  @Output() onSaveUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() onUpdateUser: EventEmitter<User> = new EventEmitter<User>();
  public types = ['select an option', 'fulltime', 'partime'];

  message;
  get diagnostic() { return JSON.stringify(this.user); }

  onSubmit() {
    if (this.user.password === this.user.password2) {
      this.newUser = false;
      this.onSaveUser.emit(this.user);
    }else{
      this.message = 'Passwords don\'t match';
    }

  }

  updateUser() {
    this.onUpdateUser.emit(this.user);
  }

  initValues(){
    this.user = new User();
    this.newUser = true;
    this.user.xhol = 0;
    this.user.manager = false;
  }

  reset() {
    this.initValues();
  }

  ngOnInit() {
    this.initValues();
    this.user.type = this.types[0];
  }

}
