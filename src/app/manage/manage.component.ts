import { Component, OnInit, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import { User } from '../shared/user.ts';
import { UserService } from '../shared/user.service.ts'; // i've imported this in module!? do that mean I just don't add it under @component
//AF
import {AngularFire,FirebaseListObservable } from 'angularfire2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
  //no directive because has module?
})
export class ManageComponent{

  // constructor(private router: Router, af: AngularFire) {
  //   this.users = af.database.list('items');        
  // }

  // users: FirebaseListObservable<any[]>;

  // //should listen emitted event, Output is on element
  // onSelectUser(user: User) {
  //   this.router.navigate(['manage', user.id]);
  // }


}
