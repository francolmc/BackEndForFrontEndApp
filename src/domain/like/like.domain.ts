import { ILikeRepository } from './ilike.repository';

export class LikeDomain {
  public constructor(private readonly _likeRepository: ILikeRepository) {}

  public async putLike(postId: number, userEmail: string): Promise<boolean> {
    await this._likeRepository.putLike(postId, userEmail);
    return true;
  }

  public async disLike(postId: number, userEmail: string): Promise<boolean> {
    const existLike = await this._likeRepository.existLike(postId, userEmail);
    if (!existLike) return false;
    await this._likeRepository.disLike(postId, userEmail);
    return true;
  }

  public async countLikesByPostId(postId: number): Promise<number> {
    return this._likeRepository.countLikes(postId);
  }
}
