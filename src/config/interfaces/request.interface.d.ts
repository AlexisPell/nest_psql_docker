import {User} from './../../users/user.model';
import {Request} from '@nestjs/common';

export type MyRequest = Request & {
	headers: Request['headers'] & {
		authorization?: string;
	};
	user?: User;
};
