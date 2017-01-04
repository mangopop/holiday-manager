import { Component, OnInit, Input, Output, ChangeDetectionStrategy } from '@angular/core';
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
  public user;
  public newUser;

  constructor(public userList$: UserListService, public router: Router) {
    this.users = userList$.getUsers();
  }

  onNewUser() {
    this.user = new User();
    this.newUser = true;
    this.user.xhol = 0;
    this.user.manager = false;
  }


  //should listen emitted event, Output is on element
  onSelectUser(user: User) {
    // console.log(user.$key);
    this.newUser = false;
    this.user = this.userList$.getUser(user.$key);
    this.user.subscribe(queriedItems => {
      // console.log(queriedItems);
      this.user = queriedItems;
    });

    // testing docs use: let url = `/heroes/${hero.id}`; this.router.navigateByUrl(url);
    // this.router.navigate(['manage/user', user.$key]);
  }

  // don't forget to add to Output on html (stupid)
  onDeleteUser(user) {
    this.userList$.deleteUser(user);
    // this.router.navigate(['manage/user/new']);    
    this.onNewUser();
  }

  onSaveUser(user) {
    this.userList$.addUser(user);
  }

  onUpdateUser(user) {

    var customUser = {
      firstname:user.firstname,
      surname:user.surname,
      xhol:user.xhol,
      startDate:user.startDate,
      manager:user.manager,
      type:user.type
    }

    // we might not set birthday so don't update it if not set
    if(user.birthday){
      customUser['birthday'].user.birthday;
    }

    console.log(customUser);
    

    this.userList$.updateUser(user.$key,customUser);
  }

  ngOnInit() {
    this.onNewUser();
  }

}
