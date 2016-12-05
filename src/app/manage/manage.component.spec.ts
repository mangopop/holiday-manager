/* tslint:disable:no-unused-variable */
declare var it, expect, describe, toBe, beforeEach;

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
// comps
import { ManageModule } from '../manage/manage.module';
import { ManageComponent } from '../manage/manage.component';
import { ManageUserListComponent } from '../manage/manage-user-list/manage-user-list.component';
import { ManageUserDetailsComponent } from '../manage/manage-user-details/manage-user-details.component';
import { SearchComponent } from '../shared/search/search.component';
// service
import {UserListService} from '../shared/user-list.service';
// AF
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, AngularFireModule} from 'angularfire2';

class FakeUserService {
  
  user = {
    id: 1,
    name: 'Gambit'
  }

  getUser(id: number) {
    return ;
  }

  getUsers() {
    return ;
  }
}

class RouterStub {
  // navigateByUrl(url: string) { return url; }
}

// let comp:    BannerComponent;
// let fixture: ComponentFixture<BannerComponent>;

describe('Module: Manage', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        ManageModule
      ]
      //This might be because we are importing the module, not the component
      // It's not possible to stub the component's HeroDetailService in the providers of the TestBed.configureTestingModule. Those are providers for the testing module, not the component. They prepare the dependency injector at the fixture level. 
      // providers: [
      //   { provide: UserListService, useValue: FakeUserService }
      // ]
    })

      // Override component's own provider
      .overrideComponent(ManageComponent, {
        set: {
          providers: [
            { provide: UserListService, useClass: FakeUserService },
            { provide: Router, useClass: RouterStub }
          ]
        }
      })

      .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppComponent);
          comp    = fixture.componentInstance;
        });

  });

  let hds: StubHeroDetailService;
  let fixture: ComponentFixture<ManageComponent>;

  beforeEach(async(() => {
    createComponent();
    // get the component's injected StubHeroDetailService
    hds = fixture.debugElement.injector.get(HeroDetailService);
  }));


});
