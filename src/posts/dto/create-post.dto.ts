import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreatePostDto {
	@ApiProperty({example: 'Title of post', description: 'Title of post'})
	@IsString({message: 'Must be a string'})
	readonly title: string;

	@ApiProperty({example: 'Content of post', description: 'Content of post'})
	@IsString({message: 'Must be a string'})
	readonly content: string;

	@ApiProperty({example: '4', description: "User's id"})
	@IsNotEmpty({message: 'User id is not provided'})
	readonly userId: number;
}
