import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

/**
 *
 */
async function bootstrap() {
    const config = new DocumentBuilder().build();
    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, config);

    app.use(cookieParser());

    SwaggerModule.setup('/api/', app, document);

    await app.listen(3000);
}
bootstrap();
