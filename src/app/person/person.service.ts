import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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
    return await firstValueFrom(
      this.http.get<PersonSummary[]>(baseURL) ?? []
    )
  }

  async fetchByName(filter: PersonFilter): Promise<any> {
    let params = new HttpParams()

    if (filter.name.trim().length != 0)
      params = params.set('name', filter.name)

    params = params.set('page', filter.page)
    params = params.set('size', filter.size)

    return await firstValueFrom(
      this.http.get(`${baseURL}/filter`, { params })
    )
  }

  async fetchByCode(code: string): Promise<any> {
    return await firstValueFrom(
      this.http.get<PersonDTO>(`${baseURL}/${code}`)
    )
  }

  async delete(code: string): Promise<void> {
    return await firstValueFrom(
      this.http.delete<void>(`${baseURL}/${code}`)
    ).catch(() => Promise.reject(null))
  }

  async toggleActivation(code: string, active: boolean): Promise<any> {
    return await firstValueFrom(
      this.http.put(`${baseURL}/${code}/active`, active)
    )
  }

  async save(person: PersonDTOInsert): Promise<PersonDTO> {
    return await firstValueFrom(
      this.http.post<PersonDTO>(baseURL, person)
    )
  }

  async update(person: PersonDTOInsert, code: string): Promise<PersonDTO> {
    const updateAddress = { address: person.address }
    const resUpdateAddress = await firstValueFrom(this.http.put<PersonDTO>(`${baseURL}/${code}/address`, updateAddress));

    const updateContacts = { contacts: person.contacts }
    const resUpdateContacts = await firstValueFrom(this.http.put<PersonDTO>(`${baseURL}/${code}/contacts`, updateContacts))

    const updatePerson = { name: person.name }
    const resPerson = await firstValueFrom(this.http.put<PersonDTO>(`${baseURL}/${code}`, updatePerson))

    return resPerson;
  }

  async fetchStates(): Promise<StateSummary[]> {
    return await firstValueFrom(this.http.get<StateSummary[]>(baseStatesURL))
  }

  async fetchCities(stateId: number): Promise<CitySummary[]> {
    let params = new HttpParams()
    params = params.set("stateId", stateId);

    return await firstValueFrom(
      this.http.get<CitySummary[]>(baseCitiesURL, { params })
    )
  }

  async fetchCityByIBGE(ibge: number): Promise<any> {
    let params = new HttpParams()
    params = params.set("ibge", ibge);

    return await firstValueFrom(
      this.http.get<any>(baseCitiesURL, { params })
    )
  }

  async fetchAddressByCEP(cep: string): Promise<ViaCepDTO | undefined> {
    return await firstValueFrom(
      this.http.get<ViaCepDTO>(`${viaCepUrl}/${cep}/json`) ?? undefined
    )
  }
}
