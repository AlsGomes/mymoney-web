import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { RegisterGridComponent } from './register-grid/register-grid.component';
import { RegistryEditingComponent } from './registry-editing/registry-editing.component';
import { SearchRegistersComponent } from './search-registers/search-registers.component';

@NgModule({
  declarations: [
    SearchRegistersComponent,
    RegisterGridComponent,
    RegistryEditingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    MessageModule,
  ],
  exports: [
    SearchRegistersComponent,
    RegistryEditingComponent
  ]
})
export class RegistryModule { }
