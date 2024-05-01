import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingFilter } from '../BookingFilter';

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
  private filter: BookingFilter = {
    startDate: '',
    endDate: '',
  };

  constructor(private http: HttpClient) {}

  getProperties() {
    return this.http.get<any>(`${this.API_URL}/properties`, this.httpOptions);
  }
  getProperty(id: string) {
    return this.http.get<any>(
      `${this.API_URL}/property/${id}`,
      this.httpOptions
    );
  }
  getPropertiesAvailable(criteria: any) {
    return this.http.post<any>(
      `${this.API_URL}/properties/available`,
      criteria,
      this.httpOptions
    );
  }

  getPropertyAvailable(id: number, criteria: any) {
    console.log(criteria);
    return this.http.post<any>(
      `${this.API_URL}/property/${id}/available`,
      criteria,
      this.httpOptions
    );
  }
  makeReservation(idProperty: number, criteria: BookingFilter, user: any) {
    const payload = {
      idProperty,
      renterEmail: user.email,
      startDate: criteria.startDate,
      endDate: criteria.endDate,
      nbGuests: criteria.minBeds,
    };
    return this.http.post<any>(
      `${this.API_URL}/book`,
      payload,
      this.httpOptions
    );
  }
}
