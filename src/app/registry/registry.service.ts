import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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
const downloadRegisterFilesURL = `${environment.apiUrl}/registers/:registerCode/attachments/:fileName`
const temporaryFileUploadURL = `${environment.apiUrl}/registers/attachment`

@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
  ) { }

  get temporaryFileUploadURL(): string {
    return temporaryFileUploadURL
  }

  get uploadHeaders() {
    return new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
  }

  async fetchByCode(code: string): Promise<any> {
    const res = await firstValueFrom(
      this.http.get<any>(`${baseURL}/${code}`)
    )
    if (res.files) {
      res.files = res.files.map((file: any) =>
      ({
        ...file,
        originalFileName: file.fileName.substring(file.fileName.indexOf('_') + 1, file.fileName.length),
      }))
    }

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

    return await firstValueFrom(
      this.http.get<any>(`${baseURL}/filter?summary`, { params })
    );
  }

  async delete(code: String): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${baseURL}/${code}`)
    )
  }

  async save(registry: RegistryDTOInsert): Promise<RegistryDTO> {
    const newRegistry: any = { ...registry }
    newRegistry.dueDate = this.datePipe.transform(registry.dueDate, 'yyy-MM-dd')!

    if (registry.paymentDate)
      newRegistry.paymentDate = this.datePipe.transform(registry.paymentDate, 'yyy-MM-dd')!

    if (registry.obs != undefined && registry.obs.trim().length == 0)
      newRegistry.obs = undefined

    const res = await firstValueFrom(
      this.http.post<RegistryDTO>(`${baseURL}`, newRegistry)
    );
    if (res && res.files) {
      res.files = res.files.map((file: any) =>
      ({
        ...file,
        originalFileName: file.fileName.substring(file.fileName.indexOf('_') + 1, file.fileName.length),
      }))
    }

    return res;
  }

  async update(registry: RegistryDTOInsert, code: string): Promise<RegistryDTO> {
    const updatedRegistry: any = { ...registry }
    updatedRegistry.dueDate = this.datePipe.transform(registry.dueDate, 'yyy-MM-dd')!

    if (registry.paymentDate)
      updatedRegistry.paymentDate = this.datePipe.transform(registry.paymentDate, 'yyy-MM-dd')!

    if (registry.obs != undefined && registry.obs.trim().length == 0)
      updatedRegistry.obs = undefined

    const res = await firstValueFrom(
      this.http.put<RegistryDTO>(`${baseURL}/${code}`, updatedRegistry)
    );
    if (res && res.files) {
      res.files = res.files.map((file: any) =>
      ({
        ...file,
        originalFileName: file.fileName.substring(file.fileName.indexOf('_') + 1, file.fileName.length),
      }))
    }

    return res;
  }

  async fetchRegisterFile(registerCode: string, fileName: any): Promise<any> {
    const url = downloadRegisterFilesURL.replace(':registerCode', registerCode).replace(':fileName', fileName);
    const headers = new HttpHeaders().append('Accept', 'application/json')
    const res = await firstValueFrom(
      this.http.get(url, { headers })
    );
    const resObj = JSON.parse(JSON.stringify(res))
    return resObj;
  }

  async fetchRegisterFileBlob(registerCode: string, fileName: any): Promise<Blob> {
    const url = downloadRegisterFilesURL.replace(':registerCode', registerCode).replace(':fileName', fileName);
    const headers = new HttpHeaders().append('Accept', 'application/pdf')
    const res = await firstValueFrom(
      this.http.get(url, { headers, responseType: 'blob' })
    );
    return res;
  }
}
