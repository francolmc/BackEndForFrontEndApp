import { Like } from '../like/like';
import { Post } from '../post/post';

export interface User {
  id: number;

  email: string;

  firstName: string;

  lastName: string;

  password: string;

  posts?: Post[];

  likes?: Like[];
}
