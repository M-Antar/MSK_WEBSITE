import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:8080',
      'http://localhost:8081',
      'http://localhost:5173',
      'https://msk-website-eamd.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  });

  const port = Number(process.env.PORT) || 8080;

  await app.listen(port, '0.0.0.0');

  console.log(`Application running on port ${port}`);
}

bootstrap();