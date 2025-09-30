import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

type HotModule = {
  hot?: {
    accept: () => void;
    dispose: (callback: () => Promise<void>) => void;
  };
};

declare const module: HotModule;

async function bootstrap() {
  const port = process.env.PORT ?? 3000;

  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const config = new DocumentBuilder()
    .setTitle('Job API')
    .setDescription('The job API description')
    .setVersion('1.0')
    .addSecurity('JWT auth', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/index.html', app, documentFactory);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.API_VERSIONING ?? '1',
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
void bootstrap();
