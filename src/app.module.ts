import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './infraestructure/database/entities/post.entity';
import { LikeEntity } from './infraestructure/database/entities/like.entity';
import { UserEntity } from './infraestructure/database/entities/user.entity';
import { UserController } from './infraestructure/controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import UserRepository from './infraestructure/database/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'masterdba',
      database: 'database_front',
      entities: [UserEntity, PostEntity, LikeEntity],
      migrations: ['src/infraestructure/database/migration*{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserRepository, UserService],
})
export class AppModule {}
