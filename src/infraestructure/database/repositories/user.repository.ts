import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import IUserRepository from 'src/domain/user/iuser.repository';
import { User } from 'src/domain/user/user';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export default class UserRepository implements IUserRepository {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  public async create(user: User): Promise<User> {
    return this._userRepository.save(user);
  }

  public async update(email: string, user: User): Promise<User> {
    const updateUser = await this.getUserByEmail(email);
    if (updateUser.email === email) {
      updateUser.firstName = user.firstName;
      updateUser.lastName = user.lastName;
    }
    return this._userRepository.save(updateUser);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this._userRepository.findOneBy({ email });
  }
}
