import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseURL = "http://localhost:8080/oauth/token"
const authorizationHeader = new HttpHeaders()
  .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
  .append('Content-Type', 'application/x-www-form-urlencoded')

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  async login(email: string, password: string): Promise<void> {
    const res = await this.http.post(baseURL, `username=${email}&password=${password}&grant_type=password`, { headers: authorizationHeader }).toPromise()
    console.log(res)
  }
}
