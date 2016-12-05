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

  constructor(public userList$: UserListService, public router: Router) {
    this.users = userList$.getUsers();
  }

  //should listen emitted event, Output is on element
  onSelectUser(user: User) {
    // testing docs use: let url = `/heroes/${hero.id}`; this.router.navigateByUrl(url);
    this.router.navigate(['manage/user', user.$key]);
  }

  // don't forget to add to Output on html (stupid)
  onDeleteUser(user){
    this.userList$.deleteUser(user);
    this.router.navigate(['manage/user/new']);
  }


}
