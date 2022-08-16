import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceRate } from './currency.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private mainUrl =
    'https://v6.exchangerate-api.com/v6/2570b0b2c70322194b28cb0a/pair';

  constructor(private http: HttpClient) {}

  public getRate(
    base_code: string,
    target_code: string
  ): Observable<InterfaceRate> {
    return this.http.get<InterfaceRate>(
      `${this.mainUrl}/${base_code}/${target_code}`
    );
  }
}
