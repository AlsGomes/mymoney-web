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
      const res = await this.http.post<any>(baseURL, `username=${email}&password=${password}&grant_type=password`, { headers: authorizationHeader, withCredentials: true }).toPromise()
      this.storeToken(res.access_token)
    } catch (err: any) {
      return Promise.reject(err)
    }
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
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

  hasAnyOfAuthorities(authorities: string[]): boolean {
    return Boolean(authorities.find(this.hasAuthority, this))
  }

  async renewAccessToken(): Promise<void> {
    try {
      const res = await this.http.post<any>(baseURL, `grant_type=refresh_token`, { headers: authorizationHeader, withCredentials: true }).toPromise()
      this.storeToken(res.access_token)
    } catch (err) {
      console.log(err)
    }
  }

  isInvalidAccessToken(): boolean {
    const token = localStorage.getItem('token')
    return !token || this.jwtHelper.isTokenExpired(token)
  }

  async logout(): Promise<void> {
    try {
      if (!this.isInvalidAccessToken()) {
        await this.http.delete(`http://localhost:8080/tokens/revoke`, { withCredentials: true }).toPromise();
      }
      
      localStorage.removeItem('token')
      this.jwtPayload = undefined
    } catch (err) {
      console.log(err)
    }
  }
}
