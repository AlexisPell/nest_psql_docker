import {API_PREFIX} from './common/constants/api';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ValidationPipe} from './common/pipes/validation.pipe';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('NEST API Documentation')
		.setDescription('Some pretty js-swagger documentation')
		.setVersion('1.0.0')
		.addTag('Some docs')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(`${API_PREFIX}/docs`, app, document);

	app.useGlobalPipes(new ValidationPipe());

	const PORT = process.env.PORT || 5000;
	await app.listen(PORT, () => console.log(`Serve is running on port ${PORT}`));
}
bootstrap();
