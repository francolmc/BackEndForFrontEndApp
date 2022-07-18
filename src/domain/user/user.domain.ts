import IUserRepository from './iuser.repository';
import { User } from './user';
import * as bcrypt from 'bcrypt';

export default class UserDomain {
  public constructor(private readonly _userRepository: IUserRepository) {}

  public async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return await this._userRepository.create(user);
  }

  public async update(email: string, user: User): Promise<User> {
    const updateUser: User = await this._userRepository.getUserByEmail(email);
    updateUser.email = user.email;
    updateUser.firstName = user.firstName;
    updateUser.lastName = user.lastName;
    return this._userRepository.update(email, updateUser);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this._userRepository.getUserByEmail(email);
  }

  public async changePassword(email: string, password: string): Promise<User> {
    const user = await this._userRepository.getUserByEmail(email);
    user.password = await bcrypt.hash(password, 10);
    return this._userRepository.changePassword(email, user);
  }

  public async isValidUserPassword(
    email: string,
    password: string,
  ): Promise<boolean> {
    const user = await this._userRepository.getUserByEmail(email);
    if (!user) return false;
    return bcrypt.compare(password, user.password);
  }
}
