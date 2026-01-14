import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesController } from '../../src/exercises/exercises.controller';
import { ExercisesService } from '../../src/exercises/exercises.service';

describe('ExercisesController', () => {
  let controller: ExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExercisesController],
      providers: [
        {
          provide: ExercisesService,
          useValue: {}, // mock simples
        },
      ],
    }).compile();

    controller = module.get<ExercisesController>(ExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
