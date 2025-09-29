import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

type HotModule = {
  hot?: {
    accept: () => void;
    dispose: (callback: () => Promise<void>) => void;
  };
};

declare const module: HotModule;

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
void bootstrap();
