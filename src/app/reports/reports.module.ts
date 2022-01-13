import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RegisterReportsComponent } from './register-reports/register-reports.component';

@NgModule({
  declarations: [
    RegisterReportsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CalendarModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
  ]
})
export class ReportsModule { }
