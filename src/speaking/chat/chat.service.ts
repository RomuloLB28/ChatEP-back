import { Injectable } from '@nestjs/common';
import { ChatProxy } from './chat.proxy';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(private readonly chatProxy: ChatProxy) {}

  chatStream(
    message: string,
    useCustomPrompt?: boolean,
    customSystemPrompt?: string,
  ): Observable<MessageEvent> {
    return this.chatProxy.chatStream(
      message,
      useCustomPrompt,
      customSystemPrompt,
    );
  }
}
