import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user';
import UserDomain from 'src/domain/user/user.domain';
import UserRepository from 'src/infraestructure/database/repositories/user.repository';

@Injectable()
export class UserService {
  private readonly _userDomain: UserDomain;

  public constructor(private readonly _userRepository: UserRepository) {
    this._userDomain = new UserDomain(this._userRepository);
  }

  public async registerUser(user: User): Promise<User> {
    return this._userDomain.create(user);
  }

  public async editUser(email: string, user: User): Promise<User> {
    return this._userDomain.update(email, user);
  }

  public async getUser(email: string): Promise<User> {
    return this._userDomain.getUserByEmail(email);
  }

  public async changePassword(email: string, password: string): Promise<User> {
    return this._userDomain.changePassword(email, password);
  }

  public async login(email: string, password: string): Promise<string> {
    return '';
  }

  public async logout() {}
}
