import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { randomImageUrl, imageSearchUrl } from './lib/giphy.api';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  public searchImage(query: string, limit = 10, offset = 0): Observable<any> {
    return this.http.get(imageSearchUrl(query, limit, offset));
  }

  public randomImage(): Observable<any> {
    return this.http.get(randomImageUrl());
  }

}
