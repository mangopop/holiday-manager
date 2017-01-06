import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserListService } from '../shared/user-list.service';
import { LoginStatusService } from '../shared/login-status.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../shared/user';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user$: Observable<any>;
  public user;
  public userData;
  // NOTE: COULD WE USE LOGIN SERVICE IN THE USER SERVICE TO GET THE ID?
  // WE COULD ALSO TAKE ADVANTAGE OF PASSING MORE DATA DOWN FROM PARENT IE LOGIN STATUS

  constructor(
    private userList$: UserListService,
    private LoginStatus$: LoginStatusService,
    private route: ActivatedRoute
  ) { }


  updateUser(user) {

    console.log(user);

    var customUser = {
      firstname: user.firstname,
      // surname:user.surname,
      // xhol:user.xhol,
      // startDate:user.startDate,
      // manager:user.manager,
      // type:user.type
    }

    // we might not set birthday so don't update it if not set
    if (user.birthday) {
      customUser['birthday'] = user.birthday;
    }

    console.log(customUser);

    this.userList$.updateUser(user.$key, customUser);
  }

  ngOnInit() {

    // this.LoginStatus$.getAuth().subscribe(data => {
    //   console.log('get auth');

    //   console.log(data);
    //   this.userList$.getUserByEmail('simon@nitritex.com').startWith([{}]).subscribe(data => {
    //     console.log('get user');

    //     this.user = data[0]
    //   });
    // });

    this.userList$.getUserByEmail().startWith([{}]).subscribe(data => {
      console.log(data)
      this.user = data[0];
    });

    // this.userList$.getUserByEmailAuto().startWith([{firstname:''} ]).subscribe(data => {
    //   console.log(data);
    //   this.user = data[0]
    // });
  }

}
