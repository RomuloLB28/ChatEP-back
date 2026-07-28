import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { IncomingMessage } from 'http';

const MICRO_URL = process.env.MICROSERVICE_URI;

@Injectable()
export class ChatProxy {
  constructor(private readonly httpService: HttpService) {}

  chat(
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
            let buffer = '';

            stream.on('data', (chunk: Buffer) => {
              buffer += chunk.toString();

              // Separa os blocos SSE do FastAPI
              const lines = buffer.split('\n');
              buffer = lines.pop() || ''; // Mantém a linha incompleta no buffer

              for (const line of lines) {
                let cleanLine = line.trim();
                if (!cleanLine) continue;

                // Remove o "data:" vindo do FastAPI para pegar apenas o JSON
                if (cleanLine.startsWith('data:')) {
                  cleanLine = cleanLine.replace(/^data:\s*/, '').trim();
                }

                if (cleanLine) {
                  try {
                    // Valida se é um JSON válido
                    const parsed = JSON.parse(cleanLine);
                    // Emite o payload limpo para o NestJS envelopar corretamente
                    subscriber.next({ data: parsed } as MessageEvent);
                  } catch (e) {
                    // Se for linha de id ou parcial, ignora silenciosamente
                  }
                }
              }
            });

            stream.on('end', () => subscriber.complete());
            stream.on('error', (err) => subscriber.error(err));
          },
          error: (err) => subscriber.error(err),
        });
    });
  }
}