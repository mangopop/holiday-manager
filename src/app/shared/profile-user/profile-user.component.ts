import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.ts';
import { UserService } from '../user.service.ts';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  constructor(private UserService:UserService, private route: ActivatedRoute, private router: Router  ) { }

  //TODO is this just a nested via that emits?

  @Input() user: User;

  ngOnInit() {
    // this.users = this.UserService.getUsers();
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      // this.UserService.getUser(id).then(user => this.user = user);
      this.user = this.UserService.getUser(id);
    });
  }

}
