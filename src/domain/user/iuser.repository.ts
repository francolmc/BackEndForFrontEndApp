import { User } from './user';

export default interface IUserRepository {
  create(user: User): Promise<User>;

  update(email: string, user: User): Promise<User>;

  getUserByEmail(email: string): Promise<User>;

  changePassword(email: string, user: User): Promise<User>;
}
