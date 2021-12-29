import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const baseURL = "http://localhost:8080/oauth/token"
const authorizationHeader = new HttpHeaders()
  .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
  .append('Content-Type', 'application/x-www-form-urlencoded')

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) {
    this.getToken();
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const res = await this.http.post<any>(baseURL, `username=${email}&password=${password}&grant_type=password`, { headers: authorizationHeader }).toPromise()
      this.storeToken(res.access_token)
    } catch (err: any) {
      if (err.status === 400 && err.error.error === "invalid_grant") {
        return Promise.reject("Usuário ou senha inválido")
      }

      if (err.status === 401 && err.error.error_description === "Usuário não encontrado") {
        return Promise.reject("Usuário ou senha inválido")
      }

      return Promise.reject(err)
    }
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    // console.log(this.jwtPayload)
    localStorage.setItem('token', token);
  }

  private getToken() {
    const token = localStorage.getItem('token');

    if (token)
      this.storeToken(token)
  }

  hasAuthority(authority: string): boolean {
    return this.jwtPayload?.authorities.includes(authority) ?? false
  }
}
