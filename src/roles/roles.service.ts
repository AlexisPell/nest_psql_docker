import {Role} from './role.model';
import {CreateRoleDto} from './dto/create-role.dto';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

@Injectable()
export class RolesService {
	constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

	async getRoleByValue(value: string) {
		const role = await this.roleRepository.findOne({where: {value}});
		return role;
	}

	async getRoles() {
		const roles = await this.roleRepository.findAll();
		return roles;
	}

	async createRole(dto: CreateRoleDto) {
		const role = await this.roleRepository.create(dto);
		return role;
	}
}
