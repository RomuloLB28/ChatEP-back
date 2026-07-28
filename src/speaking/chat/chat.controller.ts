import { Controller, Post, Body, Sse } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Observable } from 'rxjs';

@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @Sse()
  chat(
    @Body('message') message: string,
    @Body('useCustomPrompt') useCustomPrompt?: boolean,
    @Body('customSystemPrompt') customSystemPrompt?: string,
  ): Observable<MessageEvent> {
    return this.chatService.chatStream(
      message,
      useCustomPrompt,
      customSystemPrompt,
    );
  }
}
