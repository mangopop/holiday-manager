import {Component, OnInit, Input} from '@angular/core';
import {User} from '../../shared/user.ts';
import {UserService} from '../../shared/user.service.ts'; // i've imported this in module!? do that mean I just don't add it under @component
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-profile-user',
  templateUrl: './manage-user-details.component.html',
  styleUrls: ['./manage-user-details.component.css']
})
export class ManageUserDetailsComponent implements OnInit {

  constructor(private UserService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  // TODO is this just a nested via that emits?

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
