import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }