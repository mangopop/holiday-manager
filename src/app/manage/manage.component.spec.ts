/* tslint:disable:no-unused-variable */
declare var it, expect, describe, toBe, beforeEach;

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
//comps

import { ManageComponent } from '../manage/manage.component';
import { ManageUserListComponent } from '../manage/manage-user-list/manage-user-list.component';
import { ManageUserDetailsComponent } from '../manage/manage-user-details/manage-user-details.component';
//AF
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, AngularFireModule} from 'angularfire2';

describe('Module: Manage', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      // providers: [FIREBASE_PROVIDERS, defaultFirebase(config)],
      providers: [FIREBASE_PROVIDERS, AngularFire],

      declarations: [
        ManageUserListComponent,
        ManageUserDetailsComponent,
        ManageComponent,
      ],
      imports: [

      ]
    });
  });

  it('should create an instance', () => {
    let component = new ManageComponent();
    expect(component).toBeTruthy();
  });
});


// import { TestBed, async } from '@angular/core/testing';
// import { ManageComponent } from './manage.component';
// //AF
// import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, AngularFireModule} from 'angularfire2';

// describe('Component: Manage', () => {
//   it('should create an instance', () => {
//     let component = new ManageComponent();
//     expect(component).toBeTruthy();
//   });
// });
