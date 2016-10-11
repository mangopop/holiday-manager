/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
//comps
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ApproveComponent } from './approve/approve.component';
import { ManageComponent } from './manage/manage.component';
import { ManageUserListComponent } from './manage/manage-user-list/manage-user-list.component';
import { ManageUserDetailsComponent } from './manage/manage-user-details/manage-user-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { InfoPanelComponent } from './shared/info-panel/info-panel.component';
import { DashCalComponent } from './dash-cal/dash-cal.component';
import { SearchComponent } from './shared/search/search.component';

describe('App: HolidayManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DashboardComponent,
        InfoPanelComponent,
        DashCalComponent,
        ProfileComponent,
        ApproveComponent,
        ManageUserListComponent,
        ManageUserDetailsComponent,
        ManageComponent,
        CalendarComponent,
        SearchComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: DashboardComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'approve', component: ApproveComponent },
          { path: 'manage', component: ManageComponent },
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
