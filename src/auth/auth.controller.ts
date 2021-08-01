import {AuthService} from './auth.service';
import {CreateUserDto} from './../users/dto/create-user.dto';
import {API_PREFIX} from './../config/constants/api';
import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller(`${API_PREFIX}/auth`)
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/login')
	login(@Body() userDto: CreateUserDto) {
		return this.authService.login(userDto);
	}

	@Post('/registration')
	registration(@Body() userDto: CreateUserDto) {
		return this.authService.registration(userDto);
	}
}
