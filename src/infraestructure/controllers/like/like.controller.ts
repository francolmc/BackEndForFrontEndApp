import {
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LikeService } from 'src/services/like/like.service';

@Controller('/api/like')
export class LikeController {
  public constructor(private readonly _likeService: LikeService) {}

  @Put('/post/:postId/like')
  @UseGuards(JwtAuthGuard)
  public async likePost(
    @Param('postId') postId: number,
    @Request() req: any,
  ): Promise<boolean> {
    return this._likeService.likePost(postId, req.username);
  }

  @Put('/post/:postId/dislike')
  @UseGuards(JwtAuthGuard)
  public async disLikePost(
    @Param('postId') postId: number,
    @Request() req: any,
  ): Promise<boolean> {
    return this._likeService.disLikePost(postId, req.username);
  }

  @Get('/post/:postId/count')
  @UseGuards(JwtAuthGuard)
  public async countLikesPost(
    @Param('postId') postId: number,
  ): Promise<number> {
    return this._likeService.countLikesPost(postId);
  }
}
