import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PersonModule } from './person/person.module';
import { RegistryModule } from './registry/registry.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    CoreModule,
    RegistryModule,
    PersonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
