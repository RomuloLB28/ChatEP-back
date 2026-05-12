import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SpeakingController } from './speaking.controller';

import { TranscribeService } from './transcribe/transcribe.service';
import { WhisperProxy } from './transcribe/whisper.proxy';
import { ChatProxy } from './chat/chat.proxy';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [HttpModule, ChatModule],
  controllers: [SpeakingController],
  providers: [
    TranscribeService,
    WhisperProxy,
    ChatProxy
  ],
})
export class SpeakingModule {}
