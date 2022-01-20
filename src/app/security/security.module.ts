import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorizedComponent } from './authorized/authorized.component';

@NgModule({
  declarations: [
    AuthorizedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: []
})
export class SecurityModule { }
