import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PersonDTO, PersonDTOInsert, PersonSummary } from '../core/model/person';

export interface PersonFilter {
  name: string;
  size: number;
  page: number;
}

const baseURL = environment.apiUrl + "/persons";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  async fetchAll(): Promise<PersonSummary[]> {
    const res = await this.http.get<PersonSummary[]>(baseURL).toPromise()
    return res ?? []
  }

  async fetchByName(filter: PersonFilter): Promise<any> {
    let params = new HttpParams()

    if (filter.name.trim().length != 0)
      params = params.set('name', filter.name)

    params = params.set('page', filter.page)
    params = params.set('size', filter.size)

    return await this.http.get(`${baseURL}/filter`, { params }).toPromise()
  }

  async fetchByCode(code: string): Promise<any> {
    return await this.http.get<PersonDTO>(`${baseURL}/${code}`).toPromise();
  }

  async delete(code: string): Promise<void> {
    await this.http.delete(`${baseURL}/${code}`).toPromise();
  }

  async toggleActivation(code: string, active: boolean): Promise<any> {
    await this.http.put(`${baseURL}/${code}/active`, active).toPromise();
  }

  async save(person: PersonDTOInsert): Promise<PersonDTO> {
    const res = await this.http.post<PersonDTO>(baseURL, person).toPromise();
    return res!;
  }

  async update(person: PersonDTOInsert, code: string): Promise<PersonDTO> {
    const updateAddress = { address: person.address }
    const resAddress = await this.http.put<PersonDTO>(`${baseURL}/${code}/address`, updateAddress).toPromise()

    const updatePerson = { name: person.name }
    const resPerson = await this.http.put<PersonDTO>(`${baseURL}/${code}`, updatePerson).toPromise()

    return resPerson!;
  }
}
