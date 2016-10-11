import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { ManageUserDetailsComponent } from './manage-user-details/manage-user-details.component';
import { ManageUserListComponent } from './manage-user-list/manage-user-list.component';
import { ManageComponent } from './manage.component';

import { UserService } from '../shared/user.service.ts';
import { User } from '../shared/user.ts';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'manage', component: ManageComponent,
        children: [
          { path: ':id', component: ManageUserDetailsComponent }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
