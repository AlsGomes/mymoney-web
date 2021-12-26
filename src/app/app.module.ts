import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PersonModule } from './person/person.module';
import { PersonService } from './person/person.service';
import { RegistryModule } from './registry/registry.module';
import { RegistryService } from './registry/registry.service';

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
  ],
  providers: [
    RegistryService,
    PersonService,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
