import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:8080',
      'http://192.168.1.8:8080'
      // Add your laptop IP if needed:
      // 'http://192.168.1.10:5173',
    ],
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();