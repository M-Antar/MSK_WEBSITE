import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:8080',
      'http://192.168.1.8:8080',
      'https://msk-website-eamd.vercel.app',
    ],
  });

  const port = Number(process.env.PORT) || 8080;

  await app.listen(port, '0.0.0.0');

  console.log(`Application running on port ${port}`);
}

bootstrap();