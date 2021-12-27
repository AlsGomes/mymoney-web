import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../core/model/registry';

const baseURL = "http://localhost:8080/categories"
const authorizationHeader = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDA2NDY0NjUsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJ4ZE5UVTRVSDBvVC1mTGp0TzNGVDRwQXRhcnMiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.HGkYgjhKcd74_1_CHQv3VW953bhGt34SffhAOMOCPeY')

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  async fetchAll(): Promise<Category[]> {
    const res = await this.http.get<Category[]>(`${baseURL}`, { headers: authorizationHeader }).toPromise();
    return res ?? [];
  }
}