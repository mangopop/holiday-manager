import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
// import { Rx } from 'rxjs'; 
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { User } from './user';
import { LoginStatusService } from './login-status.service';

@Injectable()
export class UserListService {

  users$: FirebaseListObservable<any[]>;
  userEmail: string;

  constructor(private af: AngularFire, private LoginStatus: LoginStatusService) {
    this.users$ = this.af.database.list('User');
    // this.getLoginDetails();
  }

    getUserByEmail() {
    // Don't forget, can't return subscribe, hence mergeMap
    return this.LoginStatus.getAuth().mergeMap(auth => {
      return this.af.database.list('User', {
        query: {
          orderByChild: 'email',
          equalTo: auth.auth.email,
          limitToFirst: 1,
        }
      });
    })
  }

  // NOTE: uses user key not user login key
  // setup some typing for this?
  getUser(id) {
    console.log('getuser received id of: ' + id);

    //https://github.com/angular/angularfire2/blob/master/docs/4-querying-lists.md

    return this.users$.map((items: Array<any>) => {
      // console.log(items);
      return items.find(item => item.$key === id);
    });

    // subscribe to changes on object
    // this.user
    //   .subscribe(snapshots => {
    //     snapshots.forEach(snapshot => {
    //       console.log(snapshot.key)
    //       console.log(snapshot.val())
    //     });
    //   })

    //we can map over this and return the first result instead of array
    // return this.user.map((item: Array<any>) => item[0]);
    // }).map((items: Array<any>) => items.find(item => item.id === id));
  }

  getUsers() {
    // this.users$ = this.af.database.list('User');
    return this.users$;
  }

  addUser(user: User) {
    // TODO: do not save password
    this.users$.push(user);
    this.af.auth.createUser({ email: user.email, password: user.password }).then((user) => console.log(`Create User Success:`, user))
  }

  updateUser(key, user) {
    // console.log(user.$key);    
    // const item = this.af.database.list('User');
    this.users$.update(key, user);
  }

  deleteUser(user) {
    // console.log(user);    
    // const item = this.af.database.list('User');    
    this.users$.remove(user.$key);
  }


}
