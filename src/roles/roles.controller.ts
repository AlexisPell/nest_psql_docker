import {Role} from './role.model';
import {RolesService} from './roles.service';
import {CreateRoleDto} from './dto/create-role.dto';
import {API_PREFIX} from './../config/constants/api';
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiCreatedResponse,
	ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags("User's roles")
@Controller(`${API_PREFIX}/roles`)
export class RolesController {
	constructor(private rolesService: RolesService) {}

	@Get('/')
	@ApiOperation({summary: 'Get all roles'})
	@ApiOkResponse({
		status: 200,
		type: [Role],
		description: 'List of roles',
	})
	getAllRoles() {
		return this.rolesService.getRoles();
	}

	@Get('/:value')
	@ApiOperation({summary: 'Get role by value'})
	@ApiOkResponse({
		status: 200,
		type: Role,
		description: 'Single role by value',
	})
	getByValue(@Param('value') value: string) {
		return this.rolesService.getRoleByValue(value);
	}

	@Post()
	@ApiOperation({summary: 'Create new role for user'})
	@ApiCreatedResponse({
		type: Role,
		description: 'User created successfully',
	})
	createUser(@Body() dto: CreateRoleDto) {
		return this.rolesService.createRole(dto);
	}
}
