import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OnInputFocusDirective } from './on-input-focus.directive';
import { RegistryEditingComponent } from './registry-editing/registry-editing.component';
import { SearchPersonsComponent } from './search-persons/search-persons.component';
import { SearchRegistersComponent } from './search-registers/search-registers.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchRegistersComponent,
    NavbarComponent,
    SearchPersonsComponent,
    OnInputFocusDirective,
    RegistryEditingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
