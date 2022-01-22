import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatistcsByCategory, StatisticsByDay } from '../core/model/registry';

const baseUrlByCategory = environment.apiUrl + "/registers/statistics/by-category";
const baseUrlByDay = environment.apiUrl + "/registers/statistics/by-day";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,) { }

  async fetchStatistcsByCategory(date?: Date): Promise<StatistcsByCategory[]> {
    if (!date)
      date = new Date();

    let params = new HttpParams();
    params = params.set('date', this.datePipe.transform(date, 'yyy-MM-dd')!);

    return await firstValueFrom(
      this.http.get<StatistcsByCategory[]>(`${baseUrlByCategory}`, { params })
    )
  }

  async fetchStatistcsByDay(date?: Date): Promise<StatisticsByDay[]> {
    if (!date)
      date = new Date();

    let params = new HttpParams();
    params = params.set('date', this.datePipe.transform(date, 'yyy-MM-dd')!);

    return await firstValueFrom(this.http.get<StatisticsByDay[]>(`${baseUrlByDay}`, { params }))
  }
}
