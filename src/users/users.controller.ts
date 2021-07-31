import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {API_PREFIX} from './../config/constants/api';
import {
	ApiTags,
	ApiOperation,
	ApiCreatedResponse,
	ApiOkResponse,
} from '@nestjs/swagger';
import {Body, Controller, Get, Post} from '@nestjs/common';
import {User} from './user.model';

@ApiTags('Users')
@Controller(`${API_PREFIX}/users`)
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	@ApiOperation({summary: 'Get all users'})
	@ApiOkResponse({
		status: 200,
		type: [User],
		description: 'List of users',
	})
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@Post()
	@ApiOperation({summary: 'Create new user'})
	@ApiCreatedResponse({
		type: User,
		description: 'User created successfully',
	})
	createUser(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto);
	}
}
