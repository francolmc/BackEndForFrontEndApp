import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/user/user';
import UserDomain from 'src/domain/user/user.domain';
import UserRepository from 'src/infraestructure/database/repositories/user.repository';

@Injectable()
export class AuthService {
  private readonly _userDomain: UserDomain;

  public constructor(
    private readonly _jwtService: JwtService,
    private readonly _userRepository: UserRepository,
  ) {
    this._userDomain = new UserDomain(this._userRepository);
  }

  public async validateUser(
    userEmail: string,
    password: string,
  ): Promise<boolean> {
    return this._userDomain.isValidUserPassword(userEmail, password);
  }

  public async login(user: User): Promise<any> {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
