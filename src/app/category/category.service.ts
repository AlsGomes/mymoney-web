import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../core/model/category';

const baseURL = "http://localhost:8080/categories"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  async fetchAll(): Promise<Category[]> {
    const res = await this.http.get<Category[]>(`${baseURL}`).toPromise();
    return res ?? [];
  }
}