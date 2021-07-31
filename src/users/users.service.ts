import {RolesService} from './../roles/roles.service';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.model';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private rolesService: RolesService,
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto);
		const role = await this.rolesService.getRoleByValue('USER');
		if (role) {
			await user.$set('roles', [role.id]); // rewrite some field and update it inside db instantly
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
}
