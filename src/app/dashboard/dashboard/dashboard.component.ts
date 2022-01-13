import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import getDaysInMonth from 'date-fns/getDaysInMonth'
import { StatisticsByDay } from 'src/app/core/model/registry';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const value = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(value, '1.2-2', 'pt_BR');
        }
      }
    }
  };

  // options = {
  //   title: {
  //     display: true,
  //     text: 'My Title',
  //     fontSize: 16
  //   },
  //   legend: {
  //     position: 'bottom'
  //   }
  // };

  constructor(
    private service: DashboardService,
    private decimalPipe: DecimalPipe,) { }

  ngOnInit(): void {
    this.fetchStatsByCategory()
    this.fetchStatsByDay()
  }

  async fetchStatsByCategory() {
    // const data = await this.service.fetchStatistcsByCategory(new Date("2017-04-10"));
    const data = await this.service.fetchStatistcsByCategory(new Date());

    const categories = data.map(stats => stats.category.name);
    const totals = data.map(stats => stats.total);

    this.pieChartData = {
      labels: categories,
      datasets: [
        {
          data: totals,
          backgroundColor: [
            '#FF9900', '#109618', '#990099', '#3B3EAC',
            '#FF9900', '#109618', '#990099', '#3B3EAC',
            '#FF9900', '#109618', '#990099', '#3B3EAC']
        }
      ]
    }
  }

  async fetchStatsByDay() {
    // const data = await this.service.fetchStatistcsByDay(new Date("2017-04-10"));
    const data = await this.service.fetchStatistcsByDay(new Date());

    const totals = this.getTotalsPerDay(data, this.getWeekDays())
    this.lineChartData = {
      labels: this.getWeekDays(),
      datasets: [
        {
          label: 'Receitas',
          data: totals.income,
          borderColor: '#3366CC'
        }, {
          label: 'Despesas',
          data: totals.expense,
          borderColor: '#D62B00'
        }
      ]
    }
  }

  getWeekDays(): number[] {
    const lastDay = getDaysInMonth(new Date());
    const days: number[] = [];

    for (let i = 1; i <= lastDay; i++) {
      days.push(i)
    }

    return days;
  }

  getTotalsPerDay(stats: StatisticsByDay[], days: number[]): any {
    const incomeTotals = stats.filter(stat => stat.type == 'INCOME');
    const expenseTotals = stats.filter(stat => stat.type == 'EXPENSE');
    const totals: any = { income: [], expense: [] }

    const offset = new Date().getTimezoneOffset() * 60000

    for (const day of days) {
      let total = 0;

      for (const stat of incomeTotals) {
        const dayAsDate = new Date(new Date(stat.day).getTime() + offset)

        if (dayAsDate.getDate() == day) {
          total = stat.total
          break;
        }
      }

      totals.income.push(total)
    }

    for (const day of days) {
      let total = 0;

      for (const stat of expenseTotals) {
        const dayAsDate = new Date(new Date(stat.day).getTime() + offset)

        if (dayAsDate.getDate() == day) {
          total = stat.total
          break;
        }
      }

      totals.expense.push(total)
    }

    return totals;
  }
}
