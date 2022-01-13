import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,

    PanelModule,
    ChartModule,
  ],
  declarations: [DashboardComponent],
  providers: [
    DecimalPipe,
  ]
})
export class DashboardModule { }
