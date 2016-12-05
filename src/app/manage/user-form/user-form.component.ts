import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user';
import {UserListService} from '../../shared/user-list.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent{

  constructor(public userList: UserListService) { }

  user:User = {
    firstname:'',
    surname:''
  }
  
  submitted = false;

  onSubmit(user) {    
    this.userList.addUser(this.user);
  }

  reset(){ 
    this.user = {
      firstname:'',
      surname:''
    } 
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }


}
