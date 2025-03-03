import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('wrong Password');
    }
    if (user && (await bcrypt.compare(pass, user.password))) {
      const result = user.toObject();
      return {
        username: result.username,
        id: result._id,
      };
    }
    return 'Not Authorized';
  }
  async login(payload: any) {
    const { username, password } = payload;

    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const userData = {
      username: user.username,
      sub: user.id,
    };
    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(userData),
    };
  }
}
