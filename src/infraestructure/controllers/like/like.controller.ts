import { Controller, Get, Param, Put } from '@nestjs/common';
import { LikeService } from 'src/services/like/like.service';

@Controller('/api/like')
export class LikeController {
  public constructor(private readonly _likeService: LikeService) {}

  @Put('/post/:postId/like')
  public async likePost(@Param('postId') postId: number): Promise<boolean> {
    return this._likeService.likePost(postId, 'franco.morales@outlook.com');
  }

  @Put('/post/:postId/dislike')
  public async disLikePost(@Param('postId') postId: number): Promise<boolean> {
    return this._likeService.disLikePost(postId, 'franco.morales@outlook.com');
  }

  @Get('/post/:postId/count')
  public async countLikesPost(
    @Param('postId') postId: number,
  ): Promise<number> {
    return this._likeService.countLikesPost(postId);
  }
}
