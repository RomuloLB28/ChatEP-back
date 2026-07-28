import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { IncomingMessage } from 'http';

const MICRO_URL = process.env.MICROSERVICE_URI;

@Injectable()
export class ChatProxy {
  constructor(private readonly httpService: HttpService) {}

  chatStream(
    text: string,
    useCustomPrompt?: boolean,
    customSystemPrompt?: string,
  ): Observable<MessageEvent> {
    return new Observable((subscriber) => {
      this.httpService
        .post<IncomingMessage>(
          `${MICRO_URL}/chat`,
          {
            text,
            useCustomPrompt: useCustomPrompt ?? false,
            customSystemPrompt: customSystemPrompt ?? null,
          },
          {
            responseType: 'stream',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .subscribe({
          next: (axiosResponse) => {
            const stream = axiosResponse.data;

            stream.on('data', (chunk: Buffer) => {
              const dataText = chunk.toString();

              subscriber.next({ data: { chunk: dataText } } as MessageEvent);
            });

            stream.on('end', () => {
              subscriber.complete();
            });

            stream.on('error', (err) => {
              subscriber.error(err);
            });
          },
          error: (err) => {
            subscriber.error(err);
          },
        });
    });
  }
}
