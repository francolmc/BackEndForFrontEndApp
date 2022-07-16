import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infraestructure/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
  ) {}

  public create(user: User): User {
    return this._userRepository.create(user);
  }

  public async update(id: number, user: User): Promise<User> {
    const searchUser: User = await this._userRepository.findOneBy({ id });
    searchUser.email = user.email;
    searchUser.firstName = user.firstName;
    searchUser.lastName = user.lastName;
    return this._userRepository.save(searchUser);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this._userRepository.findOneBy({ email });
  }
}
