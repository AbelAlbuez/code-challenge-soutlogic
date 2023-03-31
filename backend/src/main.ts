import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const config = new DocumentBuilder()
    .setTitle('Soutlogic example')
    .setDescription('The SoutLogic API description')
    .setVersion('1.0')
    .addTag('SoutLogic')
    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  console.log(`Application is listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
