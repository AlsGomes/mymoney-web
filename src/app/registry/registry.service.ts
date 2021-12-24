import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface RegistryFilter {
  description: string;
  dueDateFrom?: Date;
  dueDateUntil?: Date;
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  baseURL = "http://localhost:8080/registers";
  // baseURL = "https://api.mymoney.net.br/registers";

  // authorizationHeader = "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==";
  authorizationHeader = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDAzNzcwOTYsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJ4UVI4ME5xR0o1dzBycU9iaEYxY2pLeGk1RzQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.PjZR_CmOcYgaIKNTnJTMfix6c59vSo99ttircRxkdcE";

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  fetch(filter: RegistryFilter): Promise<any> {
    const headers = new HttpHeaders().append("Authorization", this.authorizationHeader);

    let params = new HttpParams();

    if (filter.description.trim().length != 0)
      params = params.set('description', filter.description)

    if (filter.dueDateFrom)
      params = params.set('dueDateFrom', this.datePipe.transform(filter.dueDateFrom, 'yyy-MM-dd')!);

    if (filter.dueDateUntil)
      params = params.set('dueDateUntil', this.datePipe.transform(filter.dueDateUntil, 'yyy-MM-dd')!);

    params = params.set('page', filter.page)
    params = params.set('size', filter.size)

    return this.http.get(`${this.baseURL}/filter?summary`, { headers, params })
      .toPromise()
      .then((res: any) => {
        return res;
      });
  }
}
