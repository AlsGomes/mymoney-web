import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    const res = await this.http.get<any>(`${baseURL}/${code}`).toPromise();
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
    if (res && res.files) {
      res.files = res.files.map((file: any) =>
      ({
        ...file,
        originalFileName: file.fileName.substring(file.fileName.indexOf('_') + 1, file.fileName.length),
      }))
    }

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
    if (res && res.files) {
      res.files = res.files.map((file: any) =>
      ({
        ...file,
        originalFileName: file.fileName.substring(file.fileName.indexOf('_') + 1, file.fileName.length),
      }))
    }

    return res!;
  }

  async fetchRegisterFile(registerCode: string, fileName: any): Promise<any> {
    const url = downloadRegisterFilesURL.replace(':registerCode', registerCode).replace(':fileName', fileName);
    
    // const headers = new HttpHeaders().append('Accept', 'application/pdf')
    // const res = await this.http.get(url, { headers, responseType: 'blob' }).toPromise();
    // return res;

    const headers = new HttpHeaders().append('Accept', 'application/json')
    const res = await this.http.get(url, { headers }).toPromise();
    const resObj = JSON.parse(JSON.stringify(res))
    console.log(resObj)
    // return resObj;
    const blobRes = await this.http.get(resObj.url, { responseType: 'blob' }).toPromise();
    return blobRes!;
  }
}
