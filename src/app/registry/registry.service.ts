import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistryDTO, RegistryDTOInsert } from '../core/model/registry';

export interface RegistryFilter {
  description: string;
  dueDateFrom?: Date;
  dueDateUntil?: Date;
  page: number;
  size: number;
}

const baseURL = "http://localhost:8080/registers";
const authorizationHeader = new HttpHeaders().append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDA2NDY0NjUsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJ4ZE5UVTRVSDBvVC1mTGp0TzNGVDRwQXRhcnMiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.HGkYgjhKcd74_1_CHQv3VW953bhGt34SffhAOMOCPeY");

@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,) { }

  async fetch(filter: RegistryFilter): Promise<any> {
    let params = new HttpParams();

    if (filter.description.trim().length != 0)
      params = params.set('description', filter.description)

    if (filter.dueDateFrom)
      params = params.set('dueDateFrom', this.datePipe.transform(filter.dueDateFrom, 'yyy-MM-dd')!);

    if (filter.dueDateUntil)
      params = params.set('dueDateUntil', this.datePipe.transform(filter.dueDateUntil, 'yyy-MM-dd')!);

    params = params.set('page', filter.page)
    params = params.set('size', filter.size)

    return await this.http.get<any>(`${baseURL}/filter?summary`, { headers: authorizationHeader, params }).toPromise();
  }

  async delete(code: String): Promise<void> {
    await this.http.delete(`${baseURL}/${code}`, { headers: authorizationHeader }).toPromise();
  }

  async save(registry: RegistryDTOInsert): Promise<RegistryDTO> {

    registry.dueDate = this.datePipe.transform(registry.dueDate, 'yyy-MM-dd')!
    if (registry.paymentDate)
      registry.paymentDate = this.datePipe.transform(registry.paymentDate, 'yyy-MM-dd')!

    const res = await this.http.post<RegistryDTO>(`${baseURL}`, registry, { headers: authorizationHeader }).toPromise();
    return res!;
  }
}
