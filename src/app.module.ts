import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './infraestructure/database/entities/post.entity';
import { LikeEntity } from './infraestructure/database/entities/like.entity';
import { UserEntity } from './infraestructure/database/entities/user.entity';
import { UserController } from './infraestructure/controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import UserRepository from './infraestructure/database/repositories/user.repository';
import { PostController } from './infraestructure/controllers/post/post.controller';
import { PostRepository } from './infraestructure/database/repositories/post.repository';
import { PostService } from './services/post/post.service';
import { LikeRepository } from './infraestructure/database/repositories/like.repository';
import { LikeService } from './services/like/like.service';
import { LikeController } from './infraestructure/controllers/like/like.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { TextoController } from './infraestructure/controllers/texto/texto.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_SERVER,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [UserEntity, PostEntity, LikeEntity],
      migrations: ['src/infraestructure/database/migration*{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([UserEntity, PostEntity, LikeEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [
    UserController,
    PostController,
    LikeController,
    TextoController,
  ],
  providers: [
    UserRepository,
    UserService,
    PostRepository,
    PostService,
    LikeRepository,
    LikeService,
    JwtStrategy,
    AuthService,
  ],
})
export class AppModule {}
