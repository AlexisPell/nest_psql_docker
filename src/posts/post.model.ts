import {User} from './../users/user.model';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';

interface PostCreationAttrs {
	title: string;
	content: string;
	userId: number;
	image: string;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
	@ApiProperty({example: '5', description: 'Post ID'})
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({example: 'title of post', description: 'Title'})
	@Column({type: DataType.STRING, unique: true, allowNull: false})
	title: string;

	@ApiProperty({example: 'content of post', description: 'Content'})
	@Column({type: DataType.STRING, allowNull: false})
	content: string;

	@ApiProperty({example: 'Img', description: 'Image link'})
	@Column({type: DataType.STRING, allowNull: true})
	image: string;

	@ForeignKey(() => User)
	@Column({type: DataType.INTEGER})
	userId: number;

	@BelongsTo(() => User)
	author: User;
}
