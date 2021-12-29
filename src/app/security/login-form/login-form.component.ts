import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
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
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async login() {
    try {
      const res = await this.service.login(this.loginForm.email, this.loginForm.password);
      this.messageService.add({ severity: 'success', summary: 'Bem-vindo!' })
      this.router.navigate(['/registers'])
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    } finally {
      this.loginForm.password = ''
    }
  }
}
