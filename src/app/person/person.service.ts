import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CitySummary, PersonDTO, PersonDTOInsert, PersonSummary, StateSummary, ViaCepDTO } from '../core/model/person';

export interface PersonFilter {
  name: string;
  size: number;
  page: number;
}

const baseURL = environment.apiUrl + "/persons";
const baseStatesURL = environment.apiUrl + "/address/states";
const baseCitiesURL = environment.apiUrl + "/address/cities";
const viaCepUrl = 'https://viacep.com.br/ws'

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
    const res = await this.http.get<PersonDTO>(`${baseURL}/${code}`).toPromise();
    return res;
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
    await this.http.put<PersonDTO>(`${baseURL}/${code}/address`, updateAddress).toPromise()

    const updateContacts = { contacts: person.contacts }
    await this.http.put<PersonDTO>(`${baseURL}/${code}/contacts`, updateContacts).toPromise()

    const updatePerson = { name: person.name }
    const resPerson = await this.http.put<PersonDTO>(`${baseURL}/${code}`, updatePerson).toPromise()

    return resPerson!;
  }

  async fetchStates(): Promise<StateSummary[]> {
    const res = await this.http.get<StateSummary[]>(baseStatesURL).toPromise();
    return res!;
  }

  async fetchCities(stateId: number): Promise<CitySummary[]> {
    let params = new HttpParams()
    params = params.set("stateId", stateId);

    const res = await this.http.get<CitySummary[]>(baseCitiesURL, { params }).toPromise();
    return res!;
  }

  async fetchCityByIBGE(ibge: number): Promise<any> {
    let params = new HttpParams()
    params = params.set("ibge", ibge);

    const res = await this.http.get<any>(baseCitiesURL, { params }).toPromise();
    return res!;
  }

  async fetchAddressByCEP(cep: string): Promise<ViaCepDTO | undefined> {
    const res = await this.http.get<ViaCepDTO>(`${viaCepUrl}/${cep}/json`).toPromise();
    return res ?? undefined;
  }
}
