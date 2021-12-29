import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { environment } from 'src/environments/environment';
import { PersonModule } from '../person/person.module';
import { PersonService } from '../person/person.service';
import { RegistryModule } from '../registry/registry.module';
import { RegistryService } from '../registry/registry.service';
import { AuthGuard } from '../security/auth.guard';
import { AuthService } from '../security/auth.service';
import { CustomHttpInterceptor } from '../security/custom-http-interceptor';
import { SecurityModule } from '../security/security.module';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { UnathorizedComponent } from './unathorized.component';

registerLocaleData(localePt, 'pt-BR');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export function tokenGetter(): string {
  return localStorage.getItem('token') ?? "";
}

@NgModule({
  declarations: [
    NavbarComponent,
    PageNotFoundComponent,
    UnathorizedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: environment.tokenDisallowedRoutes
      }
    }),

    RegistryModule,
    PersonModule,
    SecurityModule,

    ToastModule,
    ConfirmDialogModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    NavbarComponent,

    ToastModule,
    ConfirmDialogModule,

    RegistryModule,
    PersonModule,
    SecurityModule,
  ],
  providers: [
    RegistryService,
    PersonService,
    AuthService,
    AuthGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    
    JwtHelperService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    MessageService,
    ConfirmationService,
    TranslateService,
    Title,
  ]
})
export class CoreModule { }