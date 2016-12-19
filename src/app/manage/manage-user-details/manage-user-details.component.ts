import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../../shared/user';
import { UserListService } from '../../shared/user-list.service'; // i've imported this in module!? do that mean I just don't add it under @component
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-manage-user-details',
  templateUrl: './manage-user-details.component.html',
  styleUrls: ['./manage-user-details.component.css']
})
export class ManageUserDetailsComponent implements OnInit {

  constructor(private UserListService$: UserListService, private route: ActivatedRoute, private router: Router) { }

  @Input() user;
  @Input() newUser;
  @Output() onSaveUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() onUpdateUser: EventEmitter<User> = new EventEmitter<User>();

  message;

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

  reset() {
    this.newUser = true;
    this.user = new User();
  }

  ngOnInit() {
    this.newUser = true;

  }

}
