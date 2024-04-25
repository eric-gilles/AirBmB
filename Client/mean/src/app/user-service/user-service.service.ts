import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:7777';

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Content-type',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  static cookieService: any;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/login`,
      credentials,
      this.httpOptions
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/register`,
      userData,
      this.httpOptions
    );
  }

  logout(): void {
    this.cookieService.delete('token');
  }

  setToken(token: string): void {
    this.cookieService.set('token', token);
  }

  static getToken(): string {
    return this.cookieService.get('token');
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/user`, this.httpOptions);
  }
}
