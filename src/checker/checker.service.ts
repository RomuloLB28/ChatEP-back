import { Injectable } from '@nestjs/common';
import { TutorProxy } from './tutor.proxy';

@Injectable()
export class CheckerService {
  constructor(private readonly TutorProxy: TutorProxy) {}
  async execute(text: string) {
    const lines = text.split('\n');
    
    const correctionPromises = lines.map(async (line) => {
      if (!line.trim()) return line;
      const response = await this.TutorProxy.correctText(line);
      return response.correctedText;
    });

    const correctedLines = await Promise.all(correctionPromises);

    return {
      originalText: text,
      correctedText: correctedLines.join('\n'),
      feedback: "Texto corrigido automaticamente pelo modelo.",
    };
  }
}
