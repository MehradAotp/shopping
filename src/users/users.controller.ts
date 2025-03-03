import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserInputDto } from './dto/create-user-input.dto';
import { createUserOutputDto } from './dto/create-user-output.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() user: createUserInputDto,
  ): Promise<createUserOutputDto> {
    return this.usersService.register(user);
  }
}
