import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OnInputFocusDirective } from './on-input-focus.directive';
import { PersonEditingComponent } from './person-editing/person-editing.component';
import { RegistryEditingComponent } from './registry-editing/registry-editing.component';
import { SearchPersonsComponent } from './search-persons/search-persons.component';
import { SearchRegistersComponent } from './search-registers/search-registers.component';
import { PersonsGridComponent } from './persons-grid/persons-grid.component';
import { RegisterGridComponent } from './register-grid/register-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchRegistersComponent,
    NavbarComponent,
    SearchPersonsComponent,
    OnInputFocusDirective,
    RegistryEditingComponent,
    PersonEditingComponent,
    PersonsGridComponent,
    RegisterGridComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    InputMaskModule,
    MessageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
