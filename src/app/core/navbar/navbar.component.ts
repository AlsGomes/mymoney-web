import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showingMenu = false;
  loggedUser: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.jwtPayload?.name;
  }

  hasAuthority(authority: string): boolean {
    return this.authService.hasAuthority(authority)
  }

  async logoutConfirmed() {
    try {
      await this.authService.logout()
      this.authService.login()
      this.messageService.add({ severity: 'success', detail: 'Você foi deslogado com succeso', summary: 'Logout' })
    } catch (err) {
      this.errorHandler.handle('Erro ao tentar se deslogar')
      console.log(err)
    }
  }

  logout() {
    this.confirmationService.confirm({
      message: "Deseja realmente sair?",
      accept: () => this.logoutConfirmed()
    });
  }
}
