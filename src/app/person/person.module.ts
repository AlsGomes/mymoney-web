import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { PersonContactsComponent } from './person-contacts/person-contacts.component';
import { PersonEditingComponent } from './person-editing/person-editing.component';
import { SearchPersonsComponent } from './search-persons/search-persons.component';

@NgModule({
  declarations: [
    SearchPersonsComponent,
    PersonEditingComponent,
    PersonContactsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    DropdownModule,
    DialogModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    MessageModule,
    InputMaskModule,
  ],
  exports: []
})
export class PersonModule { }
