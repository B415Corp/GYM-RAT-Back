import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('GYM-RAT API')
    .setDescription('Документация GYM-RAT API')
    .setVersion('1.0')
    .addBearerAuth(
      // Добавляем JWT авторизацию
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      authAction: {
        JWT: {
          name: 'JWT-auth',
          schema: {
            type: 'http',
            in: 'header',
            name: 'Authorization',
            scheme: 'bearer',
          },
          value: 'Bearer <JWT>', // JWT будет автоматически добавляться сюда после логина
        },
      },
    },
    customSiteTitle: 'API с авторизацией JWT',
  });

  // // Применение глобального интерсептора
  // app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(3000);
}
bootstrap();
