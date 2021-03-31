import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConversationMessage } from '../interfaces/conversation-message';

@Injectable({
  providedIn: 'root'
})
export class ConversationMessagesService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    /* this.baseUrl = 'http://localhost:3000/api/conversationMessages'; */
    this.baseUrl = 'https://letscollab-back.herokuapp.com/api/conversationMessages';
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token_auth')
      })
    }
  }

  getMessages(idconversation): Promise<ConversationMessage[]> {
    return this.httpClient.get<ConversationMessage[]>(`${this.baseUrl}/${idconversation}`, this.createHeaders()).toPromise();
  }

  create(message): Promise<ConversationMessage> {
    return this.httpClient.post<ConversationMessage>(`${this.baseUrl}/new`, message, this.createHeaders()).toPromise();
  }

  createFile(message): Promise<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/newfile`, message, this.createHeaders()).toPromise();
  }
}
