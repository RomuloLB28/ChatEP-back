import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserExercisesService } from './user-exercises.service';
import { CreateUserExerciseDto } from './dto/create-user-exercise.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user-exercises')
@UseGuards(JwtAuthGuard)
export class UserExercisesController {
  constructor(private readonly userExercisesService: UserExercisesService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateUserExerciseDto) {
    const userId = req.user.sub;
    return this.userExercisesService.createOrUpdate(userId, dto);
  }

  @Get()
  findAll() {
    return this.userExercisesService.findAll();
  }

  @Get('me')
  findMine(@Req() req: any) {
    const userId = req.user.sub; // ✅ AQUI
    return this.userExercisesService.findByUser(userId);
  }
}
