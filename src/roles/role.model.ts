import {UserRoles} from './../config/dbInnerTables/userRoles.model';
import {User} from './../users/user.model';
import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';

interface RoleCreationAttrs {
	value: string;
	description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
	@ApiProperty({example: '1', description: 'User ID'})
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({example: 'ADMIN', description: "Value of user's role"})
	@Column({type: DataType.STRING, unique: true, allowNull: false})
	value: string;

	@ApiProperty({example: 'Administrator role', description: "Role's descr"})
	@Column({type: DataType.STRING, allowNull: false})
	description: string;

	@BelongsToMany(() => User, () => UserRoles)
	users: User[];
}
