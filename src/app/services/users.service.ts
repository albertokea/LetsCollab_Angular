import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/users';
  }

  getById(id): Promise<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`, this.createHeaders()).toPromise()
  }

  getByUser(username): Promise<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/user/${username}`, this.createHeaders()).toPromise()
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token_auth')
      })
    }
  }

  tokenDecode() {
    const token = localStorage.getItem('token_auth');
    const decode = jwt_decode(token)
    const id = decode['userId']
    return id;
  }

  login(formValues): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, formValues).toPromise();
  }

  update(formValue): Promise<any> {
    return this.httpClient.put(`${this.baseUrl}/update`, formValue, this.createHeaders()).toPromise()
  }
  updateHeader(formValue): Promise<any> {
    return this.httpClient.put(`${this.baseUrl}/updateHeader`, formValue, this.createHeaders()).toPromise()
  }
}
