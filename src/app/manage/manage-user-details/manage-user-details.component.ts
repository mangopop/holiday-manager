import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../../shared/user';
import { UserListService } from '../../shared/user-list.service'; // i've imported this in module!? do that mean I just don't add it under @component
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-profile-user',
  templateUrl: './manage-user-details.component.html',
  styleUrls: ['./manage-user-details.component.css']
})
export class ManageUserDetailsComponent implements OnInit {

  constructor(private UserListService$: UserListService, private route: ActivatedRoute, private router: Router) {
  }

  // getting the user from the service again is a bit slow.

  // @Input() user :FirebaseListObservable<any[]>;

  userData;
  user: User = {
    firstname: '',
    surname: ''
  }

  form = false;
  new = false;
  submitted = false;

  newUser() {
    this.form = true;
    this.new = true;
    this.reset();
  }

  onSubmit() {
    this.UserListService$.addUser(this.user);
    this.submitted = true;
    // if (!this.new) {
    //   this.UserListService$.updateUser(this.user.$key, {
    //     firstname: this.user.firstname,
    //     surname: this.user.surname
    //   });
    // }
  }

  updateUser(){   
      this.UserListService$.updateUser(this.user.$key, {
        firstname: this.user.firstname,
        surname: this.user.surname
      });
  }


  reset() {
    this.user = {
      firstname: '',
      surname: ''
    }
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }

  ngOnInit() {
    // get the id from route params and retrieve users with service. This is instead of passing as input, which could be easier.
    this.route.params.subscribe((params: Params) => {
      //let id = +params['id']; // (+) converts string 'id' to a number
      let id = params['id'];
      if (id !== 'new'){
          this.new = false;
      }
      this.userData = this.UserListService$.getUser(id);

      this.userData.subscribe(queriedItems => {
        if (!queriedItems) {
          this.reset();
        } else {
          this.user = queriedItems;
        }

      });

    });
  }

}
