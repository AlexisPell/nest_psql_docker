import {FilesModule} from './../files/files.module';
import {Post} from 'src/posts/post.model';
import {User} from './../users/user.model';
import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {PostsController} from './posts.controller';
import {PostsService} from './posts.service';

@Module({
	controllers: [PostsController],
	providers: [PostsService],
	imports: [SequelizeModule.forFeature([User, Post]), FilesModule],
})
export class PostsModule {}
