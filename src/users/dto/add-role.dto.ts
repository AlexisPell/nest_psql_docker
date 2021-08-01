import {ApiProperty} from '@nestjs/swagger';

export class AddRoleDto {
	@ApiProperty({example: 'ADMIN', description: "User's role"})
	readonly value: string;
	@ApiProperty({example: '4', description: "User's id"})
	readonly userId: string;
}
