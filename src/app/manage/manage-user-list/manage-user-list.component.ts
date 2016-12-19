import {Component, Input, Output , EventEmitter} from '@angular/core';
import {User} from '../../shared/user';


@Component({
  selector: 'app-manage-user-list',
  templateUrl: './manage-user-list.component.html',
  styleUrls: ['./manage-user-list.component.css']
})
export class ManageUserListComponent{

  //this is a dumb component
  @Input() users;
  @Output() onSelectUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() onDeleteUser: EventEmitter<User> = new EventEmitter<User>();

  selectUser(user: User) {
      this.onSelectUser.emit(user);
  }

  deleteUser(user){
    // console.log(user.$key);
    this.onDeleteUser.emit(user);
  }

}
