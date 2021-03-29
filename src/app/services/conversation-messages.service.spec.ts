import { TestBed } from '@angular/core/testing';

import { ConversationMessagesService } from './conversation-messages.service';

describe('ConversationMessagesService', () => {
  let service: ConversationMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
