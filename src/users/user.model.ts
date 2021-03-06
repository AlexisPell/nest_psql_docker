import {UserRoles} from '../common/dbInnerTables/userRoles.model';
import {Role} from './../roles/role.model';
import {
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import {Post} from 'src/posts/post.model';

interface UserCreationAttrs {
	email: string;
	password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({example: '1', description: 'User ID'})
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({example: 'email@email.com', description: 'Email'})
	@Column({type: DataType.STRING, unique: true, allowNull: false})
	email: string;

	@ApiProperty({example: 'password', description: 'Password'})
	@Column({type: DataType.STRING, allowNull: false})
	password: string;

	@ApiProperty({example: true, description: 'Is user banned'})
	@Column({type: DataType.BOOLEAN, defaultValue: false})
	banned: boolean;

	@ApiProperty({example: 'Dumb', description: 'Why user banned'})
	@Column({type: DataType.STRING, allowNull: true})
	banReason: string;

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[];

	@HasMany(() => Post)
	posts: Post[];
}
