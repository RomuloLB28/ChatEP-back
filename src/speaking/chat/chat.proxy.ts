import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
const MICRO_URL = process.env.MICROSERVICE_URI;

@Injectable()
export class ChatProxy {
  constructor(private readonly httpService: HttpService) {}

  async chat(text: string, useCustomPrompt?: boolean, customSystemPrompt?: string) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${MICRO_URL}/chat`,
        { 
          text, 
          useCustomPrompt: useCustomPrompt ?? false, 
          customSystemPrompt: customSystemPrompt ?? null 
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    return response.data;
  }
}
