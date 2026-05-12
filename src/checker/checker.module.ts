import { Module } from '@nestjs/common';
import { CheckerController } from './checker.controller';
import { CheckerService } from './checker.service';
import { TutorProxy } from './tutor.proxy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CheckerController],
  providers: [CheckerService, TutorProxy],
})
export class CheckerModule {}
