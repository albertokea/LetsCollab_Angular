import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Post } from '../interfaces/post';
/* import 'rxjs/Rx';
import { Observable } from 'rxjs' */

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/posts';
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token_auth')
      })
    }
  }

  downloadHeaders() {
    return {

      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token_auth'),
        'Content-Type': 'aplication/json'
      })
    }
  }
  tokenDecode() {
    const token = localStorage.getItem('token_auth');
    const decode = jwt_decode(token)
    const id = decode['userId']
    return id;
  }

  getAll(offset): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getById(id): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/${id}`, this.createHeaders()).toPromise()
  }

  getByGenre(genre): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/genre/${genre}`, this.createHeaders()).toPromise()
  }

  getByLicense(license): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/license/${license}`, this.createHeaders()).toPromise()
  }

  getByKey(key): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/key/${key}`, this.createHeaders()).toPromise()
  }

  getByBpm(bpm): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/bpm/${bpm}`, this.createHeaders()).toPromise()
  }

  getByType(type): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/type/${type}`, this.createHeaders()).toPromise()
  }

  getByUserId(iduser): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/user/${iduser}`, this.createHeaders()).toPromise();
  }

  getByKeyword(keyword): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/keyword/${keyword}`, this.createHeaders()).toPromise();
  }

  create(post): Promise<Post> {
    return this.httpClient.post<Post>(`${this.baseUrl}/new`, post, this.createHeaders()).toPromise();
  }

  updateById(post): Promise<Post> {
    return this.httpClient.post<Post>(`${this.baseUrl}/update`, post, this.createHeaders()).toPromise();
  }

  deleteById(id): Promise<Post> {
    return this.httpClient.delete<Post>(`${this.baseUrl}/delete/${id}`, this.createHeaders()).toPromise();
  }

  /*  downloadFIle(file: string): Promise<any> {
     var body = { filename: file };
     return this.httpClient.post<any>(`${this.baseUrl}/download`, body, {
       responseType: 'blob',
       headers: new HttpHeaders(({ 'authorization': localStorage.getItem('token_auth'), 'Content-type': 'aplication/json' }))
     }).toPromise()
   } */
}
