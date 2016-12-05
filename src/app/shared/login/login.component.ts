import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private af: AngularFire) { }

  login = {
    email:'',
    password:''
  };

  onSubmit() {
    this.af.auth.login(this.login,{
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    });
  }

    get diagnostic() { return JSON.stringify(this.login); }

}
