import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
  .setTitle('Swagger test')
  .setDescription('This is the test of swagger api')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api', app,document);
  await app.listen(3001);
}
bootstrap();
