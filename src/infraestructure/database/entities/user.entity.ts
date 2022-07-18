import { User } from 'src/domain/user/user';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LikeEntity } from './like.entity';
import { PostEntity } from './post.entity';

@Entity({ name: 'user' })
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];
}
