import { Injectable } from '@nestjs/common';
import { ChatProxy } from './chat.proxy';

@Injectable()
export class ChatService {
  constructor(private readonly chatProxy: ChatProxy) {}

  async chat(message: string, useCustomPrompt?: boolean, customSystemPrompt?: string) {
    const result = await this.chatProxy.chat(message, useCustomPrompt, customSystemPrompt);
    return {
      reply: result.response,
    };
  }
}
