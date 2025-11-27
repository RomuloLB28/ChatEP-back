//import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  name: string;
  email: string;
  password?: string | null; // 🔥 agora pode ser string ou null
  photo?: string;
  provider?: string;
}

