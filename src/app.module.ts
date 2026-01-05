import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExercisesModule } from './exercises/exercises.module';
import { UserExercisesModule } from './user-exercises/user-exercises.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    (() => {
      const mongoUri = process.env.MONGODB_URI;
      if (!mongoUri) {
        throw new Error('❌ MONGODB_URI não definida');
      }
      return MongooseModule.forRoot(mongoUri);
    })(),

    UsersModule,
    AuthModule,
    ExercisesModule,
    UserExercisesModule,
  ],
})
export class AppModule {}
