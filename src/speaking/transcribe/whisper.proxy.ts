import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import FormData from 'form-data';

const MICRO_URL = process.env.MICROSERVICE_URI;

@Injectable()
export class WhisperProxy {
  constructor(private readonly httpService: HttpService) {}

  async transcribeAudio(file: Express.Multer.File) {
    const formData = new FormData();

    formData.append('file', file.buffer, file.originalname);

    const response = await firstValueFrom(
      this.httpService.post(`${MICRO_URL}/transcribe`, formData, {
        headers: formData.getHeaders(),
      }),
    );

    return response.data;
  }
}
