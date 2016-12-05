import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserListService } from '../shared/user-list.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user:Observable<any>;
  public id: number;

  constructor(private userList$: UserListService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.user = this.userList$.getUser(id);
    });
  }

}
