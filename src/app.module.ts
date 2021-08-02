import path from 'path';
import {ConfigModule} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {ServeStaticModule} from '@nestjs/serve-static';

// Models
import {UserRoles} from './common/dbInnerTables/userRoles.model';
import {Post} from 'src/posts/post.model';
import {Role} from './roles/role.model';
import {User} from './users/user.model';

// Modules
import {RolesModule} from './roles/roles.module';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {PostsModule} from './posts/posts.module';
import {FilesModule} from './files/files.module';

@Module({
	controllers: [],
	providers: [],
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			autoLoadModels: true,
			models: [User, Role, UserRoles, Post],
		}),
		AuthModule,
		UsersModule,
		RolesModule,
		PostsModule,
		FilesModule,
	],
})
export class AppModule {}
