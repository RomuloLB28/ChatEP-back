import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatProxy } from './chat.proxy';

@Module({
  imports: [HttpModule],
  controllers: [ChatController],
  providers: [ChatService, ChatProxy],
})
export class ChatModule {}
