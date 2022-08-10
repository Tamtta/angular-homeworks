import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalserverService {
  private mainUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  addEmployeeService(employee: IEmployee): Observable<any> {
    const header = { 'content-type': 'application/json' };
    const body = JSON.stringify(employee);
    return this.http.post(this.mainUrl + 'employees', body, {
      headers: header,
    });
  }

  getEmployeesService(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.mainUrl + 'employees');
  }

  getEmployeeService(id: number): Observable<any> {
    console.log(`${this.mainUrl}employees/${id}`);
    return this.http.get<IEmployee>(`${this.mainUrl}employees/${id}`);
  }

  updateEmployeeService(id: number, update: IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(`${this.mainUrl}employees/${id}`, update);
  }

  deleteEmployeeService(id: number): Observable<IEmployee> {
    return this.http.delete<IEmployee>(`${this.mainUrl}employees/${id}`);
  }
}
