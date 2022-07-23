import { Posts } from './post';

export interface IPostRepository {
  create(post: Posts): Promise<Posts>;
  update(id: number, post: Posts): Promise<Posts>;
  delete(id: number): Promise<boolean>;
  getPostsByUser(email: string): Promise<Posts[]>;
  getAllPosts(): Promise<Posts[]>;
  getPostById(id: number): Promise<Posts>;
  getPostsByUserWithCountLikes(email: string): Promise<Posts[]>
}
