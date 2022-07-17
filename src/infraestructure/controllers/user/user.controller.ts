import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/domain/user/user';
import { UserService } from 'src/services/user/user.service';
import { EditUserDto } from './edit-user.dto';
import { RegisterUserDto } from './register-user.dto';

@Controller('/api/user')
export class UserController {
  public constructor(private readonly _userService: UserService) {}

  @Get(':email')
  public async getUser(@Param('email') email: string): Promise<User> {
    return this._userService.getUser(email);
  }

  @Post()
  public async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<User> {
    const { email, firstName, lastName, password } = registerUserDto;
    return this._userService.registerUser({
      id: 0,
      email,
      firstName,
      lastName,
      password,
    });
  }

  @Put(':email')
  public async editUser(
    @Param('email') email: string,
    @Body() editUser: EditUserDto,
  ): Promise<User> {
    const { firstName, lastName, password } = editUser;
    return this._userService.editUser(email, {
      id: 0,
      email,
      firstName,
      lastName,
      password,
    });
  }
}
