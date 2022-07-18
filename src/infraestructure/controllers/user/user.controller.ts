import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/domain/user/user';
import { UserService } from 'src/services/user/user.service';
import { ChangePasswordDto } from './change-password.dto';
import { EditUserDto } from './edit-user.dto';
import { LoginDto } from './login.dto';
import { RegisterUserDto } from './register-user.dto';

@Controller('/api/user')
export class UserController {
  public constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {}

  @Get(':email')
  @UseGuards(JwtAuthGuard)
  public async getUser(@Param('email') email: string): Promise<User> {
    return this._userService.getUser(email);
  }

  @Post('/register')
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

  @Put(':email/update')
  @UseGuards(JwtAuthGuard)
  public async editUser(
    @Param('email') email: string,
    @Body() editUser: EditUserDto,
    @Request() req: any,
  ): Promise<User> {
    if (email !== req.username) throw new UnauthorizedException();
    const { firstName, lastName, password } = editUser;
    return this._userService.editUser(email, {
      id: 0,
      email,
      firstName,
      lastName,
      password,
    });
  }

  @Put('/changepassword')
  @UseGuards(JwtAuthGuard)
  public async changePassword(
    @Body() changePassword: ChangePasswordDto,
    @Request() req: any,
  ): Promise<User> {
    const { newPassword } = changePassword;
    return this._userService.changePassword(req.username, newPassword);
  }

  @Post('login')
  public async login(@Body() login: LoginDto): Promise<any> {
    const isValid = await this._authService.validateUser(
      login.email,
      login.password,
    );
    if (!isValid) throw new BadRequestException('User or password incorrect');
    return this._authService.login(
      await this._userService.getUser(login.email),
    );
  }
}
