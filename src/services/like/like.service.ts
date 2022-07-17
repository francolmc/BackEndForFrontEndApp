import { Injectable } from '@nestjs/common';
import { LikeDomain } from 'src/domain/like/like.domain';
import { LikeRepository } from 'src/infraestructure/database/repositories/like.repository';

@Injectable()
export class LikeService {
  private readonly _likeDomain: LikeDomain;

  public constructor(private readonly _likeRepository: LikeRepository) {
    this._likeDomain = new LikeDomain(this._likeRepository);
  }

  public async likePost(postId: number, userEmail: string): Promise<boolean> {
    return this._likeDomain.putLike(postId, userEmail);
  }

  public async disLikePost(
    postId: number,
    userEmail: string,
  ): Promise<boolean> {
    return this._likeDomain.disLike(postId, userEmail);
  }

  public async countLikesPost(postId: number): Promise<number> {
    return this._likeDomain.countLikesByPostId(postId);
  }
}
