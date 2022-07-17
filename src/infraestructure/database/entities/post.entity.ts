import { Posts } from 'src/domain/post/post';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { LikeEntity } from './like.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'post' })
export class PostEntity implements Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @OneToMany(() => LikeEntity, (like) => like.post)
  likes: LikeEntity[];
}
