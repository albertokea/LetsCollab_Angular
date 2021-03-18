import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/';
  }

  login(formValues): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}login`, formValues).toPromise();
  }
}
