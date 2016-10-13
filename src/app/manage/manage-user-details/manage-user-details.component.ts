import {Component, OnInit, Input} from '@angular/core';
import {User} from '../../shared/user.ts';
import {UserListService} from '../../shared/user-list.service.ts'; // i've imported this in module!? do that mean I just don't add it under @component
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-profile-user',
  templateUrl: './manage-user-details.component.html',
  styleUrls: ['./manage-user-details.component.css']
})
export class ManageUserDetailsComponent implements OnInit {

  constructor(private UserListService: UserListService, private route: ActivatedRoute, private router: Router) {
  }

  // TODO this page will crash is name is undefined

  // @Input() user :FirebaseListObservable<any[]>;
  @Input() user;

  ngOnInit() {
    // this.users = this.UserService.getUsers();
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      // this.UserService.getUser(id).then(user => this.user = user);
      this.user = this.UserListService.getUser(id);
    });
  }

}
