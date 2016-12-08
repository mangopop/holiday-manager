import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { BookComponent } from './book.component';
import { BookFormComponent } from './book-form/book-form.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'book', component: BookComponent,
                children: [
                    { path: 'edit/:id', component: BookFormComponent }
                ]
            }
        ])
    ],
    exports: [RouterModule],
})
export class BookRoutingModule { }
