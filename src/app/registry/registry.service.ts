import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegistryDTO, RegistryDTOInsert } from '../core/model/registry';

export interface RegistryFilter {
  description: string;
  dueDateFrom?: Date;
  dueDateUntil?: Date;
  page: number;
  size: number;
}

const baseURL = environment.apiUrl + "/registers";

@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,) { }

  async fetchByCode(code: string): Promise<any> {
    const res = await this.http.get<any>(`${baseURL}/${code}`).toPromise();
    return res;
  }

  async fetch(filter: any): Promise<any> {
    let params = new HttpParams();

    if (filter.description.trim().length != 0)
      params = params.set('description', filter.description)

    if (filter.due.dueDateFrom)
      params = params.set('dueDateFrom', this.datePipe.transform(filter.due.dueDateFrom, 'yyy-MM-dd')!);

    if (filter.due.dueDateUntil)
      params = params.set('dueDateUntil', this.datePipe.transform(filter.due.dueDateUntil, 'yyy-MM-dd')!);

    params = params.set('page', filter.page)
    params = params.set('size', filter.size)

    return await this.http.get<any>(`${baseURL}/filter?summary`, { params }).toPromise();
  }

  async delete(code: String): Promise<void> {
    await this.http.delete(`${baseURL}/${code}`).toPromise();
  }

  async save(registry: RegistryDTOInsert): Promise<RegistryDTO> {
    const newRegistry: any = { ...registry }
    newRegistry.dueDate = this.datePipe.transform(registry.dueDate, 'yyy-MM-dd')!

    if (registry.paymentDate)
      newRegistry.paymentDate = this.datePipe.transform(registry.paymentDate, 'yyy-MM-dd')!

    if (registry.obs != undefined && registry.obs.trim().length == 0)
      newRegistry.obs = undefined

    const res = await this.http.post<RegistryDTO>(`${baseURL}`, newRegistry).toPromise();
    return res!;
  }

  async update(registry: RegistryDTOInsert, code: string): Promise<RegistryDTO> {
    const updatedRegistry: any = { ...registry }
    updatedRegistry.dueDate = this.datePipe.transform(registry.dueDate, 'yyy-MM-dd')!

    if (registry.paymentDate)
      updatedRegistry.paymentDate = this.datePipe.transform(registry.paymentDate, 'yyy-MM-dd')!

    if (registry.obs != undefined && registry.obs.trim().length == 0)
      updatedRegistry.obs = undefined

    const res = await this.http.put<RegistryDTO>(`${baseURL}/${code}`, updatedRegistry).toPromise();
    return res!;
  }
}
