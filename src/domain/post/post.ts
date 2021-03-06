import { Like } from '../like/like';
import { User } from '../user/user';

export interface Posts {
  id: number;

  title: string;

  content: string;

  user?: User;

  like?: Like[];

  countLikes?: number;
}
