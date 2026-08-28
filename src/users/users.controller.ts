import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dtos/userResponse.dto';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @SerializeOptions({ type: UserResponseDto })
  register(@Body() userPayload: CreateUserDto) {
    return this.usersService.createUser(userPayload);
  }
}
