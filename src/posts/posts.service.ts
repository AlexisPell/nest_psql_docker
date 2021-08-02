import {FilesService} from './../files/files.service';
import {Post} from 'src/posts/post.model';
import {InjectModel} from '@nestjs/sequelize';
import {CreatePostDto} from './dto/create-post.dto';
import {Injectable} from '@nestjs/common';

@Injectable()
export class PostsService {
	constructor(
		@InjectModel(Post) private postRepository: typeof Post,
		private fileService: FilesService,
	) {}

	async createPost(dto: CreatePostDto, image: any) {
		const fileName = await this.fileService.createFile(image);
		const post = await this.postRepository.create({
			...dto,
			image: fileName,
			userId: Number(dto.userId),
		});
		return post;
	}
}
