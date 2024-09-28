import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UsersService } from 'src/user/service/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, _id, ...rest } = (user as UserDocument).toObject(); // Преобразуем объект Mongoose в обычный объект
      return {
        userId: _id.toString(), // Преобразуем ObjectId в строку
        ...rest,
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = { userId: user.userId, email: user.email, role: user.role }; // Убедитесь, что эти данные передаются
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
