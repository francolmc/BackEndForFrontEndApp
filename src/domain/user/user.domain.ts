import IUserRepository from './iuser.repository';
import { User } from './user';

export default class UserDomain {
  public constructor(private readonly _userRepository: IUserRepository) {}

  public async create(user: User): Promise<User> {
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
}
