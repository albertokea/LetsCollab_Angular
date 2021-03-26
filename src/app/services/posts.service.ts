import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Post } from '../interfaces/post';

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

  getByGenre(genre, offset): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/genre/${genre}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getByLicense(license, offset): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/license/${license}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getByKey(key, offset): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/key/${key}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getByBpm(bpm, offset): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/bpm/${bpm}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getByType(type, offset): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/type/${type}/offset/${offset}`, this.createHeaders()).toPromise()
  }

  getByUserId(iduser, offset): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/user/${iduser}/offset/${offset}`, this.createHeaders()).toPromise();
  }

  getByKeyword(keyword, offset): Promise<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/keyword/${keyword}/offset/${offset}`, this.createHeaders()).toPromise();
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

}
