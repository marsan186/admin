import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    password: ''
  };
  constructor(private authService: AuthService, private _router: Router) {

  }
  ngOnInit() {

  }
  login(theUser: User) {
    this.authService.login(theUser);
    this._router.navigate(['/dashboard']);
  }

}
