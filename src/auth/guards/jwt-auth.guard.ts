import {User} from './../../users/user.model';
import {MyRequest} from '../../config/interfaces/request.interface';
import {JwtService} from '@nestjs/jwt';
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	unauthorizedMsg = 'User is unauthorized';
	constructor(private JwtService: JwtService) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const req: MyRequest = context.switchToHttp().getRequest();
			const authHeader = req.headers.authorization!;
			const bearer = authHeader.split(' ')[0];
			const token = authHeader.split(' ')[1];
			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException(this.unauthorizedMsg);
			}

			const user: User = this.JwtService.verify(token);
			req.user = user;
			return true;
		} catch (error) {
			throw new UnauthorizedException(this.unauthorizedMsg);
		}
	}
}
