import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

const oauthTokenUrl = environment.apiUrl + "/oauth2/token"
const oauthAuthorizeTokenUrl = environment.apiUrl + "/oauth2/authorize"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) { }

  login() {
    const state = this.getRandomString(40)
    const codeVerifier = this.getRandomString(128);
    localStorage.setItem('state', state);
    localStorage.setItem('codeVerifier', codeVerifier);

    const codeChallenge = CryptoJS.SHA256(codeVerifier)
      .toString(CryptoJS.enc.Base64)
      .replace(/=/g, '')
      .replace(/\+/g, '')
      .replace(/\//g, '');
    const codeChallengeMethod = 'S256'
    const redirectUri = encodeURIComponent(environment.oauthCallbackUrl)
    const clientId = 'angular'
    const scope = 'read write'
    const responseType = 'code'

    const params = [
      'response_type=' + responseType,
      'client_id=' + clientId,
      'scope=' + scope,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=' + codeChallengeMethod,
      'state=' + state,
      'redirect_uri=' + redirectUri
    ]

    const fullUrl = oauthAuthorizeTokenUrl + '?' + params.join("&");
    window.location.href = fullUrl
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private storeRefreshToken(refreshToken: string) {
    localStorage.setItem('refresh_token', refreshToken);
  }

  private getToken(): string | undefined {
    const token = localStorage.getItem('token') ?? undefined;
    return token;
  }

  private getRefreshToken(): string | undefined {
    const refreshToken = localStorage.getItem('refresh_token') ?? undefined;
    return refreshToken;
  }

  hasAuthority(authority: string): boolean {
    return this.jwtPayload?.authorities.includes(authority) ?? false
  }

  hasAnyOfAuthorities(authorities: string[]): boolean {
    return Boolean(authorities.find(this.hasAuthority, this))
  }

  async getNewAccessToken(code: string, state: string): Promise<any> {
    const actualState = localStorage.getItem('state');

    if (actualState !== state) {
      return Promise.reject(null)
    }

    const actualCodeVerifier = localStorage.getItem('codeVerifier')!;
    const payload = new HttpParams()
      .append('code', code)
      .append('redirect_uri', environment.oauthCallbackUrl)
      .append('code_verifier', actualCodeVerifier)
      .append('client_id', 'angular')
      .append('grant_type', 'authorization_code')

    const basicAuth = `Basic ${btoa('angular:@ngul@r0')}`
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', basicAuth);

    try {
      const res = await this.http.post<any>(oauthTokenUrl, payload, { headers }).toPromise();
      this.storeToken(res['access_token'])
      this.storeRefreshToken(res['refresh_token'])
      return Promise.resolve(null)
    } catch (err) {
      console.log(err)
      return Promise.reject(null)
    }
  }

  async renewAccessToken(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken()
      if (!refreshToken) return Promise.reject(null);

      const basicAuth = `Basic ${btoa('angular:@ngul@r0')}`
      const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', basicAuth);

      const payload = new HttpParams()
        .append('client_id', 'angular')
        .append('grant_type', 'refresh_token')
        .append('refresh_token', refreshToken);

      const res = await this.http.post<any>(oauthTokenUrl, payload, { headers }).toPromise()
      this.storeToken(res['access_token'])
      this.storeRefreshToken(res['refresh_token'])
    } catch (err) {
      console.log(err)
      return Promise.reject(null);
    }
  }

  isInvalidAccessToken(): boolean {
    const token = this.getToken()
    return !token || this.jwtHelper.isTokenExpired(token)
  }

  async logout(): Promise<void> {
    localStorage.clear();
    this.jwtPayload = undefined
    window.location.href = `${environment.apiUrl}/logout?returnTo=${environment.logoutReturnToUrl}`
  }

  private getRandomString(size: number): string {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < size; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
