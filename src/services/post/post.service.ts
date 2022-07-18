import { Injectable } from '@nestjs/common';
import { Posts } from 'src/domain/post/post';
import { PostDomain } from 'src/domain/post/post.domain';
import { PostRepository } from 'src/infraestructure/database/repositories/post.repository';
import UserRepository from 'src/infraestructure/database/repositories/user.repository';

@Injectable()
export class PostService {
  private readonly _postDomain: PostDomain;

  public constructor(
    private readonly _postRepository: PostRepository,
    private readonly _userRepository: UserRepository,
  ) {
    this._postDomain = new PostDomain(_postRepository, _userRepository);
  }

  public async createNewPost(ownerEmail: string, post: Posts): Promise<Posts> {
    return this._postDomain.create(ownerEmail, post);
  }

  public async editPost(
    ownerEmail: string,
    id: number,
    post: Posts,
  ): Promise<Posts> {
    return this._postDomain.update(ownerEmail, id, post);
  }

  public async getAllPosts(): Promise<Posts[]> {
    return this._postDomain.getAllPosts();
  }

  public async getPostByUserEmail(email: string): Promise<Posts[]> {
    return this._postDomain.getPostByUserEmail(email);
  }

  public async showPost(id: number): Promise<Posts> {
    return this._postDomain.getPostById(id);
  }

  public async deletePost(ownerEmail: string, id: number): Promise<boolean> {
    return this._postDomain.delete(ownerEmail, id);
  }
}
