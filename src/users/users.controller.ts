import {BanUserDto} from './dto/ban-user.dto';
import {AddRoleDto} from './dto/add-role.dto';
import {DEFAULT_USER_ROLES} from './../config/constants/roles';
import {RolesGuard} from './../auth/guards/role.guard';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {API_PREFIX} from './../config/constants/api';
import {
	ApiTags,
	ApiOperation,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiBody,
} from '@nestjs/swagger';
import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {User} from './user.model';
import {Roles} from 'src/auth/decorators/roles-auth.decorator';

@ApiTags('Users')
@Controller(`${API_PREFIX}/users`)
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	@ApiOperation({summary: 'Get all users'})
	@ApiOkResponse({type: [User]})
	@UseGuards(JwtAuthGuard)
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({summary: 'Create new user'})
	@ApiCreatedResponse({
		type: User,
		description: 'User created successfully',
	})
	@Post()
	@Roles(DEFAULT_USER_ROLES.ADMIN)
	@UseGuards(RolesGuard)
	createUser(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto);
	}

	@Post('/role')
	@ApiOperation({summary: 'Grant a role'})
	@ApiBody({
		type: AddRoleDto,
	})
	@ApiCreatedResponse({
		type: User,
	})
	@Roles(DEFAULT_USER_ROLES.ADMIN)
	@UseGuards(RolesGuard)
	addRole(@Body() dto: AddRoleDto) {
		return this.usersService.addRole(dto);
	}

	@ApiOperation({summary: 'Ban a user'})
	@ApiBody({type: BanUserDto})
	@ApiCreatedResponse({type: User})
	@Post('/ban')
	@Roles(DEFAULT_USER_ROLES.ADMIN)
	@UseGuards(RolesGuard)
	ban(@Body() dto: BanUserDto) {
		return this.usersService.ban(dto);
	}
}
