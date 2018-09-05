import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import {
  countriesByCapital,
  countriesByLang,
  countriesByName,
} from './lib/countries.api';
import { imageSearchUrl, randomImageUrl } from './lib/giphy.api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public searchImage(query: string, limit = 10, offset = 0): Observable<any> {
    return this.http.get(imageSearchUrl(query, limit, offset));
  }

  public randomImage(): Observable<any> {
    return this.http.get(randomImageUrl()).pipe(delay(500));
  }

  getCountriesByLang(lang: string): Observable<any> {
    return this.http.get(countriesByLang(lang));
  }

  getCountriesByName(name: string): Observable<any> {
    return this.http.get(countriesByName(name));
  }

  getCountriesByCapital(capital: string): Observable<any> {
    return this.http.get(countriesByCapital(capital));
  }
}
