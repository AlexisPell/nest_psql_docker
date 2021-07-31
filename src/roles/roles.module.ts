import {UserRoles} from './../config/dbInnerTables/userRoles.model';
import {User} from './../users/user.model';
import {Role} from './role.model';
import {Module} from '@nestjs/common';
import {RolesService} from './roles.service';
import {RolesController} from './roles.controller';
import {SequelizeModule} from '@nestjs/sequelize';

@Module({
	providers: [RolesService],
	controllers: [RolesController],
	imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
	exports: [RolesService],
})
export class RolesModule {}
