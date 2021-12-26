import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PersonModule } from './person/person.module';
import { PersonService } from './person/person.service';
import { RegistryModule } from './registry/registry.module';
import { RegistryService } from './registry/registry.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    CoreModule,
    RegistryModule,
    PersonModule,

    ToastModule,
    ConfirmDialogModule,

    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    RegistryService,
    PersonService,
    MessageService,
    ConfirmationService,
    TranslateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
