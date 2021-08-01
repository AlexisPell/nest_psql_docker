import {User} from './../users/user.model';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from './../users/users.service';
import {CreateUserDto} from './../users/dto/create-user.dto';
import {
	HttpException,
	Injectable,
	HttpStatus,
	UnauthorizedException,
	BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async login(userDto: CreateUserDto) {
		const user = await this.validateUser(userDto);
		return this.generateToken(user);
	}

	async registration(userDto: CreateUserDto) {
		const candidate = await this.usersService.getUserByEmail(userDto.email);
		if (candidate) {
			throw new HttpException(
				'User with such credentials already exists',
				HttpStatus.BAD_REQUEST,
			);
		}
		const hashPassword = await bcrypt.hash(userDto.password, 5);
		const user = await this.usersService.createUser({
			...userDto,
			password: hashPassword,
		});
		return this.generateToken(user);
	}

	private async generateToken(user: User) {
		const payload = {email: user.email, id: user.id, roles: user.roles};
		return {
			token: this.jwtService.sign(payload),
		};
	}

	private async validateUser(userDto: CreateUserDto): Promise<User> {
		const user = await this.usersService.getUserByEmail(userDto.email);
		if (!user)
			throw new BadRequestException('User with such credentials not found');
		const passwordEquals = await bcrypt.compare(
			userDto.password,
			user?.password,
		);
		if (user && passwordEquals) {
			return user;
		}
		throw new UnauthorizedException('User with such credentials not found');
	}
}
