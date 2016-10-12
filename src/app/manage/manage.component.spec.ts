/* tslint:disable:no-unused-variable */
declare var it, expect, describe, toBe, beforeEach;

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
//comps
import { ManageModule } from '../manage/manage.module';
import { ManageComponent } from '../manage/manage.component';
import { ManageUserListComponent } from '../manage/manage-user-list/manage-user-list.component';
import { ManageUserDetailsComponent } from '../manage/manage-user-details/manage-user-details.component';
import { SearchComponent } from '../shared/search/search.component';
//AF
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, AngularFireModule} from 'angularfire2';

describe('Module: Manage', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        ManageModule
      ],
      // providers: [FIREBASE_PROVIDERS, defaultFirebase(config)],
      // providers: [FIREBASE_PROVIDERS, AngularFire],

      // declarations: [
      //   SearchComponent,
      //   ManageUserListComponent,
      //   ManageUserDetailsComponent,
      //   ManageComponent,
      // ]

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
