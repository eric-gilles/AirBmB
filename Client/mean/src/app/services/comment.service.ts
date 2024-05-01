import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Comment } from '../Comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
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

  getComentsByProperty(idProperty: number): Observable<any> {
    return this.http.get<any>(
      `${this.API_URL}/property/${String(idProperty)}/comments`,
      this.httpOptions
    );
  }

  makeComment(
    idProperty: number,
    comment: string,
    note: number
  ): Observable<any> {
    return this.userService.getUser().pipe(
      switchMap((response) => {
        const token = this.userService.getToken();
        const body = { comment, note };
        const httpOptions = {
          headers: this.httpOptions.headers.append('Authorization', token),
        };
        return this.http.post<any>(
          `${this.API_URL}/comment/${idProperty}`,
          body,
          httpOptions
        );
      })
    );
  }
}
