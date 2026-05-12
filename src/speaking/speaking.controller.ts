import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranscribeService } from './transcribe/transcribe.service';

@Controller('speaking')
export class SpeakingController {
  constructor(
    private readonly transcribeService: TranscribeService,
  ) {}

  @Post('transcribe')
  @UseInterceptors(FileInterceptor('file'))
  async transcribe(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.transcribeService.execute(file);
  }
}
