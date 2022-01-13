import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl + '/registers/reports/by-person'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
  ) { }

  async fetchReport(dates: any): Promise<Blob> {
    const params = new HttpParams()
      .set("dateFrom", this.datePipe.transform(dates.due.dueDateFrom, 'yyy-MM-dd')!)
      .set("dateUntil", this.datePipe.transform(dates.due.dueDateUntil, 'yyy-MM-dd')!);

    const res = await this.http.get(`${baseUrl}`, { params, responseType: 'blob' }).toPromise();
    return res!;
  }
}
