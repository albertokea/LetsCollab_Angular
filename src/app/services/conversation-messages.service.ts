import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConversationMessage } from '../interfaces/conversation-message';

@Injectable({
  providedIn: 'root'
})
export class ConversationMessagesService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/conversationMessages';
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token_auth')
      })
    }
  }

  getMessages(idconversation): Promise<ConversationMessage[]> {
    return this.httpClient.get<ConversationMessage[]>(`${this.baseUrl}/${idconversation}`, this.createHeaders()).toPromise()
  }
}
