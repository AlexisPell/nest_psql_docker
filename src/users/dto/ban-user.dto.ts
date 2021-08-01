import {ApiProperty} from '@nestjs/swagger';

export class BanUserDto {
	@ApiProperty({example: '4', description: "User's id"})
	readonly userId: number;
	@ApiProperty({example: 'N word in chat', description: 'Ban reason'})
	readonly banReason: string;
}
