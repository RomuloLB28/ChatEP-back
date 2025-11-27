import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, name, photo, provider } = createUserDto;

    const exists = await this.userModel.findOne({ email });
    if (exists) throw new BadRequestException('Email already in use');

    let hashedPassword: string | null = null;

    // 🔥 Só hashear se a senha existir (login tradicional)
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const created = new this.userModel({
      name,
      email,
      password: hashedPassword, // null para login social
      photo: photo ?? null,
      provider: provider ?? 'credentials',
    });

    return created.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async findAll() {
    return this.userModel.find().exec();
  }
}
