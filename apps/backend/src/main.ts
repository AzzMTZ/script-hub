import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    });

    const config = new DocumentBuilder()
        .setTitle('ScriptHub API')
        .setDescription('API documentation for the ScriptHub backend')
        .setVersion('1.0')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(process.env.PORT ?? 3000);

    console.log(`Server is running on http://localhost:${process.env.PORT ?? 3000}`);
}
void bootstrap();
