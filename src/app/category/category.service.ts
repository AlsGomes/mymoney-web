import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../core/model/category';

const baseURL = "http://localhost:8080/categories"
const authorizationHeader = new HttpHeaders().append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDA2NjgyODgsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJPX3VtT1lkT3kteDhhTUFUR0tkRmxqNFNjUFEiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.cpLoQPcIdQWR-pwaqlLKKV2eNUuJ7gJAeuqahsuRwIs')

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