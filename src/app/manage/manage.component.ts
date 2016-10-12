import { Component, OnInit, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import { User } from '../shared/user.ts';
import { UserService } from '../shared/user.service.ts'; // i've imported this in module!? do that mean I just don't add it under @component
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
  //no directive because has module?
})
export class ManageComponent implements OnInit {

  constructor(private UserService: UserService, private router: Router, af: AngularFire) {
    this.items = af.database.list('items');
  }

  items: FirebaseListObservable<any[]>;
  // users: User[] = [];old type
  users;

  //should listen emitted event, Output is on element
  onSelectUser(user: User) {
    this.router.navigate(['manage', user.id]);
  }

  ngOnInit() {
    // angular fire should handle this in future
    this.users = this.items;
    // this.users = this.UserService.getUsers();
    // console.log(this.users);
  }

}
