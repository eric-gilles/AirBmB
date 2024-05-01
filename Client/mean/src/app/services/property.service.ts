import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingFilter } from '../BookingFilter';
import { UserService } from './user.service';
import { Observable, switchMap } from 'rxjs';

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

  constructor(private http: HttpClient, private userService: UserService) {}

  getProperties(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/properties`, this.httpOptions);
  }
  getProperty(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.API_URL}/property/${id}`,
      this.httpOptions
    );
  }
  getPropertiesAvailable(criteria: any): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/properties/available`,
      criteria,
      this.httpOptions
    );
  }

  getPropertyAvailable(id: number, criteria: any): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/property/${id}/available`,
      criteria,
      this.httpOptions
    );
  }
  makeReservation(
    idProperty: number,
    criteria: BookingFilter
  ): Observable<any> {
    // Obtenir l'utilisateur et le token
    return this.userService.getUser().pipe(
      switchMap((response) => {
        if (response.message !== 'Succeed') {
          throw new Error('Failed to get user');
        }
        const user = response.user;
        const token = this.userService.getToken();

        // Créer les options de requête HTTP avec le token d'authentification
        const httpOptions = {
          headers: this.httpOptions.headers.append(
            'Authorization',
            `Bearer ${token}`
          ),
        };

        // Préparer les données de la réservation
        const payload = {
          idProperty,
          renterEmail: user.email,
          startDate: criteria.startDate,
          endDate: criteria.endDate,
          nbGuests: criteria.minBeds,
        };

        // Effectuer la réservation
        return this.http.post<any>(
          `${this.API_URL}/book`,
          payload,
          httpOptions
        );
      })
    );
  }
}
