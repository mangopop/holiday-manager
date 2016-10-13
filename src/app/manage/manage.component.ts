import { Component, OnInit, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import { UserListService } from '../shared/user-list.service';
import { User } from '../shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
  //no directive because has module?
})
export class ManageComponent {

  public users;

  constructor(userList: UserListService, public router: Router) {
    this.users = userList.getUsers();
    // console.log(userList.getUsers()); //this work(ed) probably because it's called first
  }

  //should listen emitted event, Output is on element
  onSelectUser(user: User) {
    console.log(user.id);
    this.router.navigate(['manage', user.id]);
  }


}
