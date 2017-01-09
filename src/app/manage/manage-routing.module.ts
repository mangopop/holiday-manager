import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { ManageUserDetailsComponent } from './manage-user-details/manage-user-details.component';
import { ManageUserListComponent } from './manage-user-list/manage-user-list.component';
import { ManageComponent } from './manage.component';
import { UserFormComponent } from './user-form/user-form.component';

// import { UserService } from '../shared/user.service';
// import { User } from '../shared/user.ts';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'manage', component: ManageComponent,        
        children: [
          { path: 'user/:id', component: ManageUserDetailsComponent },
          { path: 'user/new/', component: ManageUserDetailsComponent },          
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
