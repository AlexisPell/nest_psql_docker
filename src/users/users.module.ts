import {UserRoles} from './../config/dbInnerTables/userRoles.model';
import {RolesModule} from './../roles/roles.module';
import {Role} from './../roles/role.model';
import {SequelizeModule} from '@nestjs/sequelize';
import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {User} from './user.model';
import {AuthModule} from 'src/auth/auth.module';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		SequelizeModule.forFeature([User, Role, UserRoles]),
		RolesModule,
		forwardRef(() => AuthModule),
	],
	exports: [UsersService],
})
export class UsersModule {}
