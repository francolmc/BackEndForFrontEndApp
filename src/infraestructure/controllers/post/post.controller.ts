import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Posts } from 'src/domain/post/post';
import { PostService } from 'src/services/post/post.service';
import { EditPostDto } from './edit-post.dto';
import { NewPostDto } from './new-post.dto';

@Controller('/api/post')
export class PostController {
  public constructor(private readonly _postService: PostService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getAllPost(): Promise<Posts[]> {
    return this._postService.getAllPosts();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getPostById(@Param('id') id: number): Promise<Posts> {
    const result = await this._postService.showPost(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  @Get('/user/:email')
  @UseGuards(JwtAuthGuard)
  public async getPostsByUserEmail(
    @Param('email') email: string,
  ): Promise<Posts[]> {
    return this._postService.getPostByUserEmail(email);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createNewPost(
    @Body() post: NewPostDto,
    @Request() req: any,
  ): Promise<Posts> {
    const { title, content } = post;
    return this._postService.createNewPost(req.username, {
      id: 0,
      title,
      content,
    });
  }

  @Put('/:id/update')
  @UseGuards(JwtAuthGuard)
  public async editPost(
    @Param('id') id: number,
    @Body() editPost: EditPostDto,
    @Request() req: any,
  ): Promise<Posts> {
    const { title, content } = editPost;
    const getPostForConfirmExist = await this._postService.showPost(id);
    if (!getPostForConfirmExist) throw new NotFoundException();
    return this._postService.editPost(req.user.username, id, {
      id: 0,
      title,
      content,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async deletePost(
    @Param('id') id: number,
    @Request() req: any,
  ): Promise<boolean> {
    const getPostForConfirmExist = await this._postService.showPost(id);
    if (!getPostForConfirmExist) throw new NotFoundException();
    return this._postService.deletePost(req.username, id);
  }
}
