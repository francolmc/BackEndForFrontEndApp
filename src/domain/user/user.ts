import { Like } from '../like/like';
import { Posts } from '../post/post';

export interface User {
  id: number;

  email: string;

  firstName: string;

  lastName: string;

  password: string;

  posts?: Posts[];

  likes?: Like[];
}
