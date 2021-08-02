import {PostsService} from './posts.service';
import {API_PREFIX} from './../common/constants/api';
import {
	Body,
	Controller,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import {CreatePostDto} from './dto/create-post.dto';
import {FileInterceptor} from '@nestjs/platform-express';

@Controller(`${API_PREFIX}/posts`)
export class PostsController {
	constructor(private postService: PostsService) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	createPost(@Body() dto: CreatePostDto, @UploadedFile() image: any) {
		return this.postService.createPost(dto, image);
	}
}
