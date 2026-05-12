import { Injectable } from '@nestjs/common';
import { ChatProxy } from './chat.proxy';

@Injectable()
export class ChatService {
  constructor(private readonly chatProxy: ChatProxy) {}

  async chat(message: string) {
    const result = await this.chatProxy.chat(message);

    return {
      reply: result.response,
    };
  }
}
