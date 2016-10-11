import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { User } from '../shared/user.ts';
import { UserService } from '../shared/user.service.ts'; //i've imported this in module!? do that mean I just don't add it under @component

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private UserService:UserService) { }
  
   users: User[] = [];

  ngOnInit() {
      //angular fire should handle this in future
      this.users = this.UserService.getUsers();
      // console.log(this.users);
  }

}
