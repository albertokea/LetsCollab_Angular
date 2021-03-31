import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversation } from '../interfaces/conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    /* this.baseUrl = 'http://localhost:3000/api/conversations'; */
    this.baseUrl = 'https://letscollab-back.herokuapp.com/api/conversations';
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token_auth')
      })
    }
  }

  getByConversationId(idconversation): Promise<Conversation> {
    return this.httpClient.get<Conversation>(`${this.baseUrl}/${idconversation}`, this.createHeaders()).toPromise();
  }

  getByUserId(iduser): Promise<Conversation[]> {
    return this.httpClient.get<Conversation[]>(`${this.baseUrl}/user/${iduser}`, this.createHeaders()).toPromise();
  }

  getByUsersIds(iduser1, iduser2): Promise<Conversation> {
    return this.httpClient.get<Conversation>(`${this.baseUrl}/users/${iduser1}/user2/${iduser2}`, this.createHeaders()).toPromise();
  }

  create(conversation): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/new`, conversation, this.createHeaders()).toPromise();
  }
}
