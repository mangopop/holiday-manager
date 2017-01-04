import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class LoginStatusService {

  constructor(private af: AngularFire) { }

  status = {
    loginStatus: false,
    email: null,
    uid: null,
  };

  // don't have getLogin here because of subscribe and post subscribe problem so just return the auth object
  getAuth(){
    return this.af.auth;
  }

  //NOTE: maybe we aren't waiting for this correctly?
  getStatus() {
    console.log('call get status');    
    this.af.auth.subscribe(auth => {      
      if (auth != null) {
        console.log(auth);
        // can't get email perhaps try this https://firebase.google.com/docs/auth/web/manage-users
        this.status = {
          loginStatus: true,
          email: auth.auth.email,
          uid: auth.auth.uid,
        };
      } else {
        console.log(auth);
        this.status = {
          loginStatus: false,
          email: null,
          uid: null,
        };
      }

    });

    return this.status;
  }

}
