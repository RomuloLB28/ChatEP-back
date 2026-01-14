import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from '../../src/exercises/exercises.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

describe('ExercisesService', () => {
  let service: ExercisesService;
  let model: any;

  // 🔹 Mock do Model COMO CONSTRUTOR
  const mockExerciseModel:any = jest.fn().mockImplementation(dto => ({
    ...dto,
    save: jest.fn().mockResolvedValue(dto),
  }));

  // 🔹 Métodos estáticos do Mongoose
  mockExerciseModel.find = jest.fn();
  mockExerciseModel.findById = jest.fn();
  mockExerciseModel.findByIdAndUpdate = jest.fn();
  mockExerciseModel.findByIdAndDelete = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExercisesService,
        {
          provide: getModelToken('Exercise'),
          useValue: mockExerciseModel,
        },
      ],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
    model = module.get(getModelToken('Exercise'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ---------------- CREATE ----------------
  it('should create an exercise', async () => {
    const dto = { title: 'Test', type: 'speaking' };

    const result = await service.create(dto as any);

    expect(result).toEqual(dto);
    expect(model).toHaveBeenCalledWith(dto);
  });

  // ---------------- FIND ALL ----------------
  it('should return all exercises', async () => {
    const exercises = [{ title: 'Ex 1' }];

    model.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(exercises),
    });

    const result = await service.findAll();

    expect(result).toEqual(exercises);
    expect(model.find).toHaveBeenCalled();
  });

  // ---------------- FIND ONE ----------------
  it('should return one exercise by id', async () => {
    const exercise = { id: '123', title: 'Ex' };

    model.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(exercise),
    });

    const result = await service.findOne('123');

    expect(result).toEqual(exercise);
  });

  it('should throw NotFoundException when exercise not found', async () => {
    model.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.findOne('123')).rejects.toThrow(NotFoundException);
  });

  // ---------------- FIND BY TYPE ----------------
  it('should return exercises by type', async () => {
    const exercises = [{ type: 'listening' }];

    model.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(exercises),
    });

    const result = await service.findByType('listening');

    expect(result).toEqual(exercises);
    expect(model.find).toHaveBeenCalledWith({ type: 'listening' });
  });

  // ---------------- UPDATE ----------------
  it('should update an exercise', async () => {
    const updated = { level: 'B2' };

    model.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockResolvedValue(updated),
    });

    const result = await service.update('123', { level: 'B2' });

    expect(result).toEqual(updated);
  });

  it('should throw NotFoundException when updating non-existing exercise', async () => {
    model.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.update('123', { level: 'B2' })).rejects.toThrow(
      NotFoundException,
    );
  });

  // ---------------- REMOVE ----------------
  it('should remove an exercise', async () => {
    const deleted = { id: '123' };

    model.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue(deleted),
    });

    const result = await service.remove('123');

    expect(result).toEqual(deleted);
  });

  it('should throw NotFoundException when removing non-existing exercise', async () => {
    model.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.remove('123')).rejects.toThrow(NotFoundException);
  });
});
