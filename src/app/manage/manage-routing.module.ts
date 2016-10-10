import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileUserComponent } from '../shared/profile-user/profile-user.component';

import { UserService } from '../shared/user.service.ts';
import { User } from '../shared/user.ts';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'manage/user/:id', component: ProfileUserComponent }
  ])],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
