import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
// import { Rx } from 'rxjs'; 
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { User } from './user';

@Injectable()
export class UserListService {

  users: FirebaseListObservable<any[]>;
  user;

  // items;

  uid = 'id-er984n';

  constructor(private af: AngularFire) {
    // this.users = this.af.database.list('User');


    // this.items = af.database.list('items', {
    //   query: {
    //     orderByChild: 'id',
    //     equalTo: 1
    //   },
    //    preserveSnapshot: true 
    //   });


  }

  getUser(id){
    console.log('getuser received id of: '+id);    

    //https://github.com/angular/angularfire2/blob/master/docs/4-querying-lists.md

    // db structure won't query more than 1 deep! so need to restructure db with ref
    // how do we query by key?

    this.user = this.af.database.list('User');

    // TODO this just ain't going to work because we cannot add id, hence we cannot 'get' with it.
    // this.user = this.af.database.list('User',{
    //   query: {        
    //     orderByChild: 'id',        
    //     equalTo: id
    //     //limitToFirst: 10,
    //   }
    // });

    return this.user.map((items: Array<any>) => {
      // console.log(items);
      return items.find(item => item.$key === id);      
    });

    // subscribe to changes on list
    // this.user.subscribe(queriedItems => {
    //   console.log(queriedItems);  
    // });

    // subscribe to changes on object
    // this.user
    //   .subscribe(snapshots => {
    //     snapshots.forEach(snapshot => {
    //       console.log(snapshot.key)
    //       console.log(snapshot.val())
    //     });
    //   })

    // return this.user;

    //we can map over this and return the first result instead of array
    // return this.user.map((item: Array<any>) => item[0]);
    // }).map((items: Array<any>) => items.find(item => item.id === id));
  }

  getUsers(){
    this.users = this.af.database.list('User');
    return this.users;
  }

  addUser(user:User){
    // console.log(user);    
    const item = this.af.database.list('User');
    item.push(user);
    this.af.auth.createUser({ email:user.email, password:user.password }).then((user) => console.log(`Create User Success:`, user))
  }

  updateUser(key,user){
    // console.log(user.$key);    
    const item = this.af.database.list('User');
    item.update(key,user);
  }

  deleteUser(user){
    // console.log(user);    
    const item = this.af.database.list('User');    
    item.remove(user.$key);
  }

}
