/* tslint:disable:no-unused-variable */
declare var it, expect, describe, toBe, beforeEach;
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
//comps
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ApproveComponent } from './approve/approve.component';
// import { ManageComponent } from './manage/manage.component';
// import { ManageUserListComponent } from './manage/manage-user-list/manage-user-list.component';
// import { ManageUserDetailsComponent } from './manage/manage-user-details/manage-user-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { InfoPanelComponent } from './shared/info-panel/info-panel.component';
import { DashCalComponent } from './dash-cal/dash-cal.component';
import { SearchComponent } from './shared/search/search.component';
//AF
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, AngularFireModule} from 'angularfire2';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';

describe('App: HolidayManager', () => {
  beforeEach(() => {
    // const config = {
    //   apiKey: "123",
    //   authDomain: "123.firebaseapp.com",
    //   databaseURL: "https://123.firebaseio.com",
    //   storageBucket: "123.appspot.com",
    // };

    TestBed.configureTestingModule({
      // providers: [FIREBASE_PROVIDERS, defaultFirebase(config)],

      declarations: [
        AppComponent,
        DashboardComponent,
        ProfileComponent,
        ApproveComponent,
        CalendarComponent,
        InfoPanelComponent,
        DashCalComponent,
        ProfileDetailsComponent,        
        // ManageComponent,
      ],
      imports: [
        // AngularFireModule.initializeApp({
        //   apiKey: "AIzaSyBVSy3YpkVGiKXbbxeK0qBnu3-MNZ9UIjA",
        //   authDomain: "angularfire2-test.firebaseapp.com",
        //   databaseURL: "https://angularfire2-test.firebaseio.com",
        //   storageBucket: "angularfire2-test.appspot.com",
        // }),
        RouterTestingModule.withRoutes([
          { path: '', component: DashboardComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'approve', component: ApproveComponent },
          // { path: 'manage', component: ManageComponent },
          { path: 'calendar', component: CalendarComponent },
        ]),
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Holiday Manager'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Holiday Manager');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Holiday Manager');
  }));
});
