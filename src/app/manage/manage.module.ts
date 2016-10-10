import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ManageRoutingModule } from './manage-routing.module'
//components
import { ManageUserListComponent }    from './manage-user-list/manage-user-list.component';
import { ManageComponent }  from './manage.component';
import { SearchComponent } from '../shared/search/search.component';

import { UserService } from '../shared/user.service.ts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ManageRoutingModule
  ],
  declarations: [
    ManageUserListComponent,
    ManageComponent,
    SearchComponent
  ],
  providers: [
    UserService
  ]
})
export class ManageModule {}
