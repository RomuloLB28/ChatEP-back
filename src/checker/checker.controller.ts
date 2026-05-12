import { Controller, Post, Body } from '@nestjs/common';
import { CheckerService } from './checker.service';

@Controller('checker')
export class CheckerController {
  constructor(
    private readonly checkerService: CheckerService,
  ) {}

  @Post('correct-text')
  async correctText(@Body('text') text: string) {
    return this.checkerService.execute(text);
  }
}
