import { Injectable } from '@nestjs/common';
import { WhisperProxy } from './whisper.proxy';

@Injectable()
export class TranscribeService {
  constructor(
    private readonly whisperProxy: WhisperProxy,
  ) {}

  async execute(file: Express.Multer.File) {
    const result =
      await this.whisperProxy.transcribeAudio(file);

    return {
      text: result.text,
    };
  }
}
