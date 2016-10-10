import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user-list',
  templateUrl: './manage-user-list.component.html',
  styleUrls: ['./manage-user-list.component.css']
})
export class ManageUserListComponent implements OnInit {

  constructor(private router: Router) { }

  onSelectUser(user: User) {
    //TODO user might not be correct route
      this.router.navigate(['/manage/user', user.id]);
    }

  @Input() users;

  ngOnInit() {
  }

}
