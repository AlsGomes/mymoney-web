import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showingMenu = false;
  loggedUser: string = '';

  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.jwtPayload?.user_name.split('@')[0];
  }

  hasAuthority(authority: string): boolean {
    return this.authService.hasAuthority(authority)
  }
}
