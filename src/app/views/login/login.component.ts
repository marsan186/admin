import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    password: ''
  };
  constructor() {

  }
  ngOnInit() {

  }
  login(theUser: User) {
    console.log(theUser);
  }
}
