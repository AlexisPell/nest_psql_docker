import {AuthService} from './auth.service';
import {User} from './../users/user.model';
import {CreateUserDto} from './../users/dto/create-user.dto';
import {API_PREFIX} from './../config/constants/api';
import {Body, Controller, Post} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiCreatedResponse,
	// ApiOkResponse,
	ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags("User's authorization")
@Controller(`${API_PREFIX}/auth`)
export class AuthController {
	constructor(private authService: AuthService) {}

	// @Post('/login')
	// @ApiOperation({summary: 'Login user'})
	// @ApiOkResponse({
	// 	type: User,
	// 	description: 'User created successfully',
	// })
	// login(@Body() userDto: CreateUserDto) {
	// 	return this.authService.login(userDto);
	// }

	@Post('/registration')
	@ApiOperation({summary: 'Register user'})
	@ApiCreatedResponse({
		type: User,
		description: 'User registered',
	})
	@ApiBadRequestResponse({
		description: 'Bad request on registration',
	})
	registration(@Body() userDto: CreateUserDto) {
		return this.authService.registration(userDto);
	}
}
