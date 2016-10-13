import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ManageRoutingModule } from './manage-routing.module'
//components
import { ManageUserListComponent }    from './manage-user-list/manage-user-list.component';
import { ManageComponent }  from './manage.component';
import { SearchComponent } from '../shared/search/search.component';
import { ManageUserDetailsComponent } from './manage-user-details/manage-user-details.component';

import { UserListService } from '../shared/user-list.service.ts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ManageRoutingModule
  ],
  //exports: [ ContactComponent ],// if other modules needed it
  declarations: [
    ManageUserListComponent,
    ManageUserDetailsComponent,
    ManageComponent,
    SearchComponent
  ],
  providers: [
    UserListService //make this available for the module, which is fine.
  ]
})
export class ManageModule {}
