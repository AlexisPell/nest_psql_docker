import {ApiProperty} from '@nestjs/swagger';
import {IsString, Length, IsEmail} from 'class-validator';

export class CreateUserDto {
	@ApiProperty({example: 'email@email.com', description: 'Email'})
	@IsString({message: 'Must be a string'})
	@IsEmail({}, {message: 'Uncorrect email'})
	readonly email: string;

	@ApiProperty({example: 'password', description: 'Password'})
	@IsString({message: 'Must be a string'})
	@Length(6, 255, {message: 'Length must be from 6 to 255'})
	readonly password: string;
}
