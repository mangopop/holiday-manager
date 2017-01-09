import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
//routing
import { ManageRoutingModule } from './manage-routing.module'
//components
import { ManageComponent }  from './manage.component';
import { SearchComponent } from '../shared/search/search.component';
import { ManageUserListComponent }    from './manage-user-list/manage-user-list.component';
import { ManageUserDetailsComponent } from './manage-user-details/manage-user-details.component';

import { UserListService } from '../shared/user-list.service';
import { UserFormComponent } from './user-form/user-form.component';


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
    SearchComponent,
    UserFormComponent,
  ],
  providers: [
    UserListService //make this available for the module, which is fine.
  ]
})
export class ManageModule {}
