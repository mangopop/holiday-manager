import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {User} from '../../shared/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-user-list',
  templateUrl: './manage-user-list.component.html',
  styleUrls: ['./manage-user-list.component.css']
})
export class ManageUserListComponent implements OnInit {

  constructor(private router: Router) {
  }

  // should we emit this to parent? then this is a dumb component. what are the benefits?
  onSelectUser(user: User) {
    this.router.navigate(['manage', user.id]);
  }

  @Input() users;
  // @Output() onSelectUser = new EventEmitter<User>();

  ngOnInit() {
  }

}
