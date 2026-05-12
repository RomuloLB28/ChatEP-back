import { Injectable } from '@nestjs/common';
import { TutorProxy } from './tutor.proxy';

@Injectable()
export class CheckerService {
  constructor(private readonly TutorProxy: TutorProxy) {}
  async execute(text: string) {
    const response = await this.TutorProxy.correctText(text);

    return {
      originalText: text,
      correctedText: response.correctedText,
      feedback: response.feedback,
    };
  }
}
