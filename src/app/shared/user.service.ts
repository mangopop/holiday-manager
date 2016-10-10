import { Injectable } from '@angular/core';
import { User } from './user'; 
import { USERS } from './mock-user'; 

@Injectable()
export class UserService {

  constructor() { }

  getUsers(): User[] {
    return USERS;
  }

  getUser(id): User{
    //grab user by id
    return USERS[id];
  }

}
