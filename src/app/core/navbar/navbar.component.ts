import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/security/auth.service';

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
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.showName()
  }

  hasAuthority(authority: string): boolean {
    return this.authService.hasAuthority(authority)
  }

  logoutConfirmed() {
    this.authService.logout()
  }

  logout() {
    this.confirmationService.confirm({
      message: "Deseja realmente sair?",
      accept: () => this.logoutConfirmed()
    });
  }

  closeMenu() {
    this.showingMenu = false
  }

  openMenu() {
    this.showingMenu = true
  }

  toggleMenu() {
    this.showingMenu = !this.showingMenu
    this.showName()
  }

  showName() {
    this.loggedUser = this.authService.jwtPayload?.name;
  }
}
