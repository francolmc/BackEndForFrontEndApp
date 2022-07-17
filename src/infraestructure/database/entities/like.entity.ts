import { Like } from 'src/domain/like/like';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'like' })
export class LikeEntity implements Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  like: boolean;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  user: UserEntity;
}
