import {User} from './../../users/user.model';
import {ROLES_KEY} from './../decorators/roles-auth.decorator';
import {MyRequest} from '../../common/interfaces/request.interface';
import {JwtService} from '@nestjs/jwt';
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
	unauthorizedMsg = 'User is unauthorized';
	wrongRoleMsg = "User's role is not corresponding to access this route";
	constructor(private JwtService: JwtService, private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const requiredRoles = this.reflector.getAllAndOverride<string[]>(
				ROLES_KEY,
				[context.getHandler(), context.getClass()],
			);
			if (!requiredRoles) {
				return true;
			}

			const req: MyRequest = context.switchToHttp().getRequest();
			const authHeader = req.headers.authorization!;
			const bearer = authHeader.split(' ')[0];
			const token = authHeader.split(' ')[1];
			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException(this.unauthorizedMsg);
			}

			const user: User = this.JwtService.verify(token);
			req.user = user;
			// check if user has necessary role
			return user.roles.some((role) => requiredRoles.includes(role.value));
		} catch (error) {
			console.log(
				'🚀 ~ file: role.guard.ts ~ line 45 ~ RolesGuard ~ error',
				error,
			);
			throw new ForbiddenException(this.wrongRoleMsg);
		}
	}
}
