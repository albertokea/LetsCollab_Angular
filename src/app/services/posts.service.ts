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

  getAll(offset): Promise<{ info: any, results: Post[] }> {
    return this.httpClient.get<{ info: any, results: Post[] }>(`${this.baseUrl}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getById(id): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`, this.createHeaders()).toPromise()
  }

  getByGenre(genre, offset): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/genre/${genre}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getByLicense(license, offset): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/license/${license}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getByKey(key, offset): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/key/${key}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getByBpm(bpm, offset): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/bpm/${bpm}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getByType(type, offset): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/type/${type}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getByUserId(iduser, offset): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/user/${iduser}/offset/${offset}`, this.createHeaders()).toPromise();
  }

  getByKeyword(keyword, offset): Promise<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/keyword/${keyword}/offset/${offset}`, this.createHeaders()).toPromise();
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
