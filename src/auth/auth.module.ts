import {UsersService} from './../users/users.service';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {forwardRef, Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		forwardRef(() => UsersService),
		JwtModule.register({
			secret: process.env.PRIVATE_JWT_KEY || 'SECRET',
			signOptions: {
				expiresIn: '24h',
			},
		}),
	],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
