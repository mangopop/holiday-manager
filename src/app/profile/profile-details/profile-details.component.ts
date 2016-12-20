import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  constructor() { }

  @Input() user;

  ngOnInit() {
    console.log(this.user);
    
  }

}
