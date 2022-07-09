import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './infraestructure/database/entities/post.entity';
import { Like } from './infraestructure/database/entities/like.entity';
import { User } from './infraestructure/database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'masterdba',
      database: 'database_front',
      entities: [User, Post, Like],
      migrations: ['src/infraestructure/database/migration*{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
