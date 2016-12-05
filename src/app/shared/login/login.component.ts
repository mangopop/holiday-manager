import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginStatus = false;
  login = {
    email:'',
    password:''
  };

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(auth => {
      console.log(auth);      
      if(auth != null){
          this.loginStatus = true;
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
