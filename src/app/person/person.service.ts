import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonSummary } from '../core/model/registry';

export interface PersonFilter {
  name: string;
  size: number;
  page: number;
}

const baseURL = "http://localhost:8080/persons";
const authorizationHeader = new HttpHeaders().append('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDA2NDY0NjUsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJ4ZE5UVTRVSDBvVC1mTGp0TzNGVDRwQXRhcnMiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.HGkYgjhKcd74_1_CHQv3VW953bhGt34SffhAOMOCPeY");

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  async fetchAll(): Promise<PersonSummary[]> {
    const res = await this.http.get<PersonSummary[]>(baseURL, { headers: authorizationHeader }).toPromise()
    return res ?? []
  }

  async fetchByName(filter: PersonFilter): Promise<any> {
    let params = new HttpParams()

    if (filter.name.trim().length != 0)
      params = params.set('name', filter.name)

    params = params.set('page', filter.page)
    params = params.set('size', filter.size)

    return await this.http.get(`${baseURL}/filter`, { headers: authorizationHeader, params }).toPromise()
  }

  async delete(code: string): Promise<void> {
    await this.http.delete(`${baseURL}/${code}`, { headers: authorizationHeader }).toPromise();
  }

  async toggleActivation(code: string, active: boolean): Promise<any> {
    await this.http.put(`${baseURL}/${code}/active`, active, { headers: authorizationHeader }).toPromise();
  }
}
