import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { PostMessage } from '../interfaces/post-message';

@Injectable({
  providedIn: 'root'
})
export class PostMessagesService {

  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/postMessages';
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

  getByPost(idpost): Promise<PostMessage[]> {
    return this.httpClient.get<PostMessage[]>(`${this.baseUrl}/post/${idpost}`, this.createHeaders()).toPromise();
  }

  getByUser(iduser): Promise<PostMessage[]> {
    return this.httpClient.get<PostMessage[]>(`${this.baseUrl}/post/${iduser}`, this.createHeaders()).toPromise();
  }

  create(message): Promise<PostMessage> {
    return this.httpClient.post<PostMessage>(`${this.baseUrl}/post/${message}`, this.createHeaders()).toPromise();
  }

  deleteById(id): Promise<PostMessage> {
    return this.httpClient.delete<PostMessage>(`${this.baseUrl}/delete/${id}`, this.createHeaders()).toPromise();
  }






}
