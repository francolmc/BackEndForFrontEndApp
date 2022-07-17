import IUserRepository from '../user/iuser.repository';
import { IPostRepository } from './ipost.repository';
import { Posts } from './post';

export class PostDomain {
  public constructor(
    private readonly _postRepository: IPostRepository,
    private readonly _userRepository: IUserRepository,
  ) {}

  public async create(email: string, post: Posts): Promise<Posts> {
    const user = await this._userRepository.getUserByEmail(email);
    post.user = user;
    return this._postRepository.create(post);
  }

  public async update(
    ownerEmail: string,
    id: number,
    post: Posts,
  ): Promise<Posts> {
    const originalPost = await this._postRepository.getPostById(id);
    if (originalPost.user.email !== ownerEmail) {
      throw new Error('You not have access for modify this post.');
    }
    originalPost.content = post.content;
    originalPost.title = post.title;
    return this._postRepository.update(id, originalPost);
  }

  public async delete(ownerEmail: string, id: number): Promise<boolean> {
    const originalPost = await this._postRepository.getPostById(id);
    if (originalPost.user.email !== ownerEmail) {
      throw new Error('You not have access for delete this post.');
    }
    return this._postRepository.delete(id);
  }

  public async getPostByUserEmail(email: string): Promise<Posts[]> {
    return this._postRepository.getPostsByUser(email);
  }

  public async getPostById(id: number): Promise<Posts> {
    return this._postRepository.getPostById(id);
  }

  public async getAllPosts(): Promise<Posts[]> {
    return this._postRepository.getAllPosts();
  }
}
