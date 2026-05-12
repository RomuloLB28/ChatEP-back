import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const MICRO_URL = process.env.MICROSERVICE_URI;

@Injectable()
export class TutorProxy {
  constructor(private readonly httpService: HttpService) {}

  async correctText(text: string) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${MICRO_URL}/correct-text`,
        { text }, // body JSON
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
