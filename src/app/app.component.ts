import { Component } from '@angular/core';
// import {MenuItem} from 'primeng/primeng';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  id = 1; // TODO this will be the user auth id
  title = 'Holiday Manager';

}