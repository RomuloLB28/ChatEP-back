import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    // 🔥 Se o usuário não tem senha (login social), não pode validar aqui
    if (!user.password) {
      return null;
    }

    const match = await bcrypt.compare(pass, user.password);

    if (match) {
      const { password, ...result } = user.toObject();
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(createUserDto: any) {
    const user = await this.usersService.create(createUserDto);
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  // 🔥 Versão corrigida do validateGoogleUser
  async validateGoogleUser(data: any) {
    const { email, name, image, provider } = data;

    let user = await this.usersService.findByEmail(email);

    if (!user) {
      user = await this.usersService.create({
        name,
        email,
        photo: image,
        provider: provider ?? 'google',
        password: null, // permitido pelo DTO
      });
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
