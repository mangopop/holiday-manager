import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserListService } from '../shared/user-list.service';
import { LoginStatusService } from '../shared/login-status.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user$: Observable<any>;
  public userData;
  // NOTE: COULD WE USE LOGIN SERVICE IN THE USER SERVICE TO GET THE ID?
  // WE COULD ALSO TAKE ADVANTAGE OF PASSING MORE DATA DOWN FROM PARENT IE LOGIN STATUS


  constructor(
    private userList$: UserListService,
    private LoginStatus$: LoginStatusService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // const userId = this.LoginStatus$.getStatus();
    // console.log(userId);

    this.LoginStatus$.getAuth().subscribe(data => {
      console.log(data);
      this.user$ = this.userList$.getUserByEmail('simon@nitritex.com');
    });

    // this.route.params.forEach((params: Params) => {
    //   let id = +params['id']; // (+) converts string 'id' to a number
    //   this.user = this.userList$.getUser(id);
    // });
  }

}
