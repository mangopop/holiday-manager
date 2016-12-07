import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
//not sure
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule , AuthProviders, AuthMethods } from 'angularfire2';
//routing
import { BookRoutingModule } from './book-routing.module'
//components
import { BookComponent }   from './book.component';
import { BookFormComponent }   from './book-form/book-form.component';
//service
import { UserListService } from '../shared/user-list.service';
import { HolidayService } from '../shared/holiday.service';
import { LoginStatusService } from '../shared/login-status.service';

@NgModule({
    imports: [
        BookRoutingModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        BookComponent,
        BookFormComponent
    ],
    providers: [
        UserListService,
        HolidayService,
        LoginStatusService
    ]
})
export class BookModule { }
