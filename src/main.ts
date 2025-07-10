import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Account-APIs')
    .setDescription('Accounts')
    .setVersion('1.0')
    .addTag('')
    // .addBearerAuth(
    //   {
    //     scheme: 'bearer',
    //     bearerFormat: 'JWT',
    //     type: 'http'
    //   },
    //   'Authorization'
    // )
    .build()
  const document= SwaggerModule.createDocument(app, config);
  await app.listen(process.env.PORT ?? 3001);

}
bootstrap();


