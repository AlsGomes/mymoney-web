import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchRegistersComponent } from './search-registers/search-registers.component';
import { SearchPersonsComponent } from './search-persons/search-persons.component';
import { OnInputFocusDirective } from './on-input-focus.directive';


@NgModule({
  declarations: [
    AppComponent,
    SearchRegistersComponent,
    NavbarComponent,
    SearchPersonsComponent,
    OnInputFocusDirective,
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
