import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
const MICRO_URL = process.env.MICROSERVICE_URI;

@Injectable()
export class ChatProxy {
  constructor(private readonly httpService: HttpService) {}

  async chat(text: string) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${MICRO_URL}/chat`,
        { text }, // precisa bater com request.text no FastAPI
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
