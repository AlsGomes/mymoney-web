import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      const hasParams = params.code;
      if (hasParams) {
        this.authService.getNewAccessToken(params.code, params.state)
          .then(() => {
            this.router.navigate(['/dashboard']);
          })
          .catch((err) => {
            console.log('callback error')
          })
      } else {
        this.authService.login();
        // this.router.navigate(['/']);
      }
    })
  }

}
