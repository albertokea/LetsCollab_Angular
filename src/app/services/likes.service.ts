import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Like } from '../interfaces/like';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/likes'
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token_auth')
      })
    }
  }

  getLike(idpost, iduser): Promise<Like> {
    return this.httpClient.get<Like>(`${this.baseUrl}/${idpost}/user/${iduser}`, this.createHeaders()).toPromise();
  }

  getByUser(iduser): Promise<Like[]> {
    return this.httpClient.get<Like[]>(`${this.baseUrl}/user/${iduser}`, this.createHeaders()).toPromise();
  }

  create(like): Promise<Like> {
    return this.httpClient.post<Like>(`${this.baseUrl}/new`, like, this.createHeaders()).toPromise()
  }

  delete(idlike): Promise<Like> {
    return this.httpClient.delete<Like>(`${this.baseUrl}/delete/${idlike}`, this.createHeaders()).toPromise();
  }

}
