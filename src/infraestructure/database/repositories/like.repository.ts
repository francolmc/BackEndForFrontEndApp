import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILikeRepository } from 'src/domain/like/ilike.repository';
import { Repository } from 'typeorm';
import { LikeEntity, PostEntity, UserEntity } from '../entities';

@Injectable()
export class LikeRepository implements ILikeRepository {
  public constructor(
    @InjectRepository(LikeEntity)
    private readonly _likeRepository: Repository<LikeEntity>,
    @InjectRepository(PostEntity)
    private readonly _postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}
  public async countLikes(postId: number): Promise<number> {
    return await this._likeRepository.count({
      where: { post: { id: postId }, like: true },
    });
  }

  public async putLike(postId: number, userEmail: string): Promise<boolean> {
    let like = await this.getLikeByPostAndEmail(postId, userEmail);
    if (!like) {
      like = new LikeEntity();
      like.post = await this._postRepository.findOneBy({ id: postId });
      like.user = await this._userRepository.findOneBy({ email: userEmail });
    }
    like.like = true;
    await this._likeRepository.save(like);
    return true;
  }

  public async disLike(postId: number, userEmail: string): Promise<boolean> {
    const like = await this.getLikeByPostAndEmail(postId, userEmail);
    if (!like) return false;
    like.like = false;
    await this._likeRepository.save(like);
    return true;
  }

  public async existLike(postId: number, userEmail: string): Promise<boolean> {
    const result = await this.getLikeByPostAndEmail(postId, userEmail);
    if (!result) return false;
    return true;
  }

  private async getLikeByPostAndEmail(
    postId: number,
    userEmail: string,
  ): Promise<LikeEntity> {
    return this._likeRepository.findOneBy({
      post: { id: postId },
      user: { email: userEmail },
    });
  }
}
