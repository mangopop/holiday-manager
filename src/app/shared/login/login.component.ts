import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginStatus = false;
  userEmail;
  login = {
    email:'',
    password:''
  };

  constructor(private af: AngularFire) {
    // TODO: might want this as service
    this.af.auth.subscribe(auth => {
      // console.log(auth);      
      if(auth != null){
        // can't get email perhaps try this https://firebase.google.com/docs/auth/web/manage-users
          this.loginStatus = true;
          console.log(auth.auth.email);          
          this.userEmail = auth.auth.email;    
      }else{
          this.loginStatus = false;
      }
      
    });
  }

  logout() {
     this.af.auth.logout();
  }

  onSubmit() {
    this.af.auth.login(this.login,{
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    });
  }

  get diagnostic() { return JSON.stringify(this.login); }

}
