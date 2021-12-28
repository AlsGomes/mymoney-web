import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

export interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: LoginForm = {
    email: '',
    password: ''
  }

  constructor(
    private service: AuthService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.service.login(this.loginForm.email, this.loginForm.password);
  }
}
