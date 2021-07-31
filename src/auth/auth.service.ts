import {User} from './../users/user.model';
import {UsersService} from './../users/users.service';
import {CreateUserDto} from './../users/dto/create-user.dto';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) {}

	// async login(userDto: CreateUserDto) {

	// }

	async registration(userDto: CreateUserDto) {
		const candidate = await this.userService.getUserByEmail(userDto.email);
		if (candidate) {
			throw new HttpException(
				'User with such email already exists',
				HttpStatus.BAD_REQUEST,
			);
		}
		const hashPassword = await bcrypt.hash(userDto.password, 5);

		const user = await this.userService.createUser({
			...userDto,
			password: hashPassword,
		});
		return this.generateToken(user);
	}

	async generateToken(user: User) {
		const payload = {email: user.email, id: user.id, roles: user.roles};
		return {
			token: this.jwtService.sign(payload),
		};
	}
}
