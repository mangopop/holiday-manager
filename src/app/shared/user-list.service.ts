import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {AngularFire, FirebaseListObservable } from 'angularfire2';
import { User } from './user';

@Injectable()
export class UserListService {

  users: Observable<User[]>
  user: Observable<User[]>

  constructor(private af: AngularFire) {

  }

  getUser(id) {
    this.user = this.af.database.list('items', {
      query: {
        equalTo: id
      }
    });
  }

  getUsers() {
    return this.af.database.list('items');
  }

}
