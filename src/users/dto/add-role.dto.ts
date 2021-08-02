import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';

export class AddRoleDto {
	@ApiProperty({example: 'ADMIN', description: "User's role"})
	@IsString({message: 'Must be a string'})
	readonly value: string;
	@ApiProperty({example: '4', description: "User's id"})
	@IsNumber({}, {message: 'Must be a number'})
	readonly userId: string;
}
