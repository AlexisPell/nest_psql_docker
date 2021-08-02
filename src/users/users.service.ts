import {BanUserDto} from './dto/ban-user.dto';
import {AddRoleDto} from './dto/add-role.dto';
import {DEFAULT_USER_ROLES} from '../common/constants/roles';
import {RolesService} from './../roles/roles.service';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.model';
import {Injectable, BadRequestException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private rolesService: RolesService,
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto);
		const role = await this.rolesService.getRoleByValue(
			DEFAULT_USER_ROLES.ADMIN,
		);
		if (role) {
			await user.$set('roles', [role.id]); // rewrite some field and update it inside db instantly
			user.roles = [role];
		}
		if (!role) {
			console.error('No role found by value in createUser', user);
		}
		return user;
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({include: {all: true}}); // with all related models
		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: {email},
			include: {all: true},
		});
		return user;
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		const role = await this.rolesService.getRoleByValue(dto.value);
		if (role && user) {
			await user.$add('role', role.id);
			return user;
		}
		if (!user) {
			throw new BadRequestException('User not found');
		} else {
			throw new BadRequestException('Role not found');
		}
	}

	async ban(dto: BanUserDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		if (!user) {
			throw new BadRequestException('User not found with such id');
		}
		user.banned = true;
		user.banReason = dto.banReason;
		await user.save();
		return user;
	}
}
