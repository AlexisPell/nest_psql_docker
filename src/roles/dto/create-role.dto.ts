import {ApiProperty} from '@nestjs/swagger';

export class CreateRoleDto {
	@ApiProperty({example: 'ADMIN', description: "User's role"})
	readonly value: string;
	@ApiProperty({
		example: 'This is administrator role...',
		description: 'role description',
	})
	readonly description: string;
}
