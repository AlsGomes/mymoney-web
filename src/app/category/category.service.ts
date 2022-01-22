import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../core/model/category';

const baseURL = environment.apiUrl + "/categories"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  async fetchAll(): Promise<Category[]> {
    return await firstValueFrom(
      this.http.get<Category[]>(`${baseURL}`) ?? []
    )
  }
}