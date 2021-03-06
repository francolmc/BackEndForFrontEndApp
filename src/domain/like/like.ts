import { Posts } from '../post/post';
import { User } from '../user/user';

export interface Like {
  id: number;

  like: boolean;

  user?: User;

  post?: Posts;
}
