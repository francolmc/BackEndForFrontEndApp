import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Posts } from 'src/domain/post/post';
import { PostService } from 'src/services/post/post.service';
import { EditPostDto } from './edit-post.dto';
import { NewPostDto } from './new-post.dto';

@Controller('/api/post')
export class PostController {
  public constructor(private readonly _postService: PostService) {}

  @Get()
  public async getAllPost(): Promise<Posts[]> {
    return this._postService.getAllPosts();
  }

  @Get(':id')
  public async getPostById(@Param('id') id: number): Promise<Posts> {
    const result = await this._postService.showPost(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  @Get('/user/:email')
  public async getPostsByUserEmail(
    @Param('email') email: string,
  ): Promise<Posts[]> {
    return this._postService.getPostByUserEmail(email);
  }

  @Post()
  public async createNewPost(@Body() post: NewPostDto): Promise<Posts> {
    const { title, content } = post;
    return this._postService.createNewPost('franco.morales@outlook.com', {
      id: 0,
      title,
      content,
    });
  }

  @Put('/:id')
  public async editPost(
    @Param('id') id: number,
    @Body() editPost: EditPostDto,
  ): Promise<Posts> {
    const { title, content } = editPost;
    const getPostForConfirmExist = await this._postService.showPost(id);
    if (!getPostForConfirmExist) throw new NotFoundException();
    return this._postService.editPost('franco.morales@outlook.com', id, {
      id: 0,
      title,
      content,
    });
  }

  @Delete(':id')
  public async deletePost(@Param('id') id: number): Promise<boolean> {
    const getPostForConfirmExist = await this._postService.showPost(id);
    if (!getPostForConfirmExist) throw new NotFoundException();
    return this._postService.deletePost('franco.morales@outlook.com', id);
  }
}
