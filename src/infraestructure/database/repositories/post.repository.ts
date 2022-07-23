import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPostRepository } from 'src/domain/post/ipost.repository';
import { Posts } from 'src/domain/post/post';
import { Repository } from 'typeorm';
import { PostEntity } from '../entities';

@Injectable()
export class PostRepository implements IPostRepository {
  public constructor(
    @InjectRepository(PostEntity)
    private readonly _postRepository: Repository<PostEntity>,
  ) {}

  public async getAllPostsWithCountLikes(): Promise<Posts[]> {
    const sql = "" + 
    "SELECT " +
    "  post.id, " +
    "  post.title, " +
    "  post. `content`, " +
    "  SUM(`like`.`like`) AS countLikes " +
    "FROM " +
    "  post " +
    "  INNER JOIN `like` ON post.id = `like`.postId " +
    "  INNER JOIN `user` ON post.userId = `user`.id";

    return this._postRepository.query(sql);
  }

  public async create(post: Posts): Promise<Posts> {
    return this._postRepository.save(post);
  }

  public async update(id: number, post: Posts): Promise<Posts> {
    const editPost = await this._postRepository.findOneBy({ id });
    if (editPost) {
      editPost.content = post.content;
      editPost.title = post.title;
    }
    return this._postRepository.save(editPost);
  }

  public async delete(id: number): Promise<boolean> {
    const deletePost = await this._postRepository.findOneBy({ id });
    if (!deletePost) return false;
    const result = this._postRepository.remove(deletePost);
    if (!result) return false;
    return true;
  }

  public async getPostsByUser(email: string): Promise<Posts[]> {
    return this._postRepository.findBy({ user: { email } });
  }

  public async getAllPosts(): Promise<Posts[]> {
    return this._postRepository.find();
  }

  public async getPostById(id: number): Promise<Posts> {
    return this._postRepository.findOne({ where: { id }, relations: ['user'] });
  }
}
