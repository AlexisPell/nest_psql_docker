import {UserRoles} from './config/dbInnerTables/userRoles.model';
import {Role} from './roles/role.model';
import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {ConfigModule} from '@nestjs/config';

// Modules
import {UsersModule} from './users/users.module';

// Entities
import {User} from './users/user.model';
import {RolesModule} from './roles/roles.module';
import {AuthModule} from './auth/auth.module';

@Module({
	controllers: [],
	providers: [],
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			autoLoadModels: true,
			models: [User, Role, UserRoles],
		}),
		UsersModule,
		RolesModule,
		AuthModule,
	],
})
export class AppModule {}
