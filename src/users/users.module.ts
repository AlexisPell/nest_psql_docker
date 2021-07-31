import {UserRoles} from './../config/dbInnerTables/userRoles.model';
import {RolesModule} from './../roles/roles.module';
import {Role} from './../roles/role.model';
import {SequelizeModule} from '@nestjs/sequelize';
import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {User} from './user.model';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule],
	// exports: [UsersService],
})
export class UsersModule {}
