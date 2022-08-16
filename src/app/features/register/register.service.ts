import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private mainUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  addUserService(user: USER): Observable<any> {
    const header = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);
    return this.http.post(this.mainUrl + 'users', body, {
      headers: header,
    });
  }

  getUsersService(): Observable<USER[]> {
    return this.http.get<USER[]>(this.mainUrl + 'users');
  }

  getUserService(id: number): Observable<any> {
    console.log(`${this.mainUrl}users/${id}`);
    return this.http.get<USER>(`${this.mainUrl}users/${id}`);
  }

  updateUserService(id: number, update: USER): Observable<USER> {
    return this.http.put<USER>(`${this.mainUrl}users/${id}`, update);
  }

  deleteUserService(id: number): Observable<USER> {
    return this.http.delete<USER>(`${this.mainUrl}users/${id}`);
  }
}
