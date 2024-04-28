import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private API_URL = 'http://localhost:7777';

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Content-type',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}

  getProperties(): any {
    return this.http.get<any>(`${this.API_URL}/properties`, this.httpOptions);
  }
  getProperty(id: string): any {
    return this.http.get<any>(
      `${this.API_URL}/property/${id}`,
      this.httpOptions
    );
  }
}
