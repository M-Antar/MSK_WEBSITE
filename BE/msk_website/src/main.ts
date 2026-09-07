import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // (Postman, server-to-server, direct browser requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      const allowed =
        origin === 'http://localhost:8080' ||
        origin === 'http://localhost:8081' ||
        origin === 'http://localhost:5173' ||
        origin === 'https://msk-website-eamd.vercel.app' ||
        origin.endsWith('.vercel.app');

      if (allowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },

    credentials: true,

    methods: [
      'GET',
      'HEAD',
      'PUT',
      'PATCH',
      'POST',
      'DELETE',
      'OPTIONS',
    ],
  });

  const port = Number(process.env.PORT) || 8080;

  await app.listen(port, '0.0.0.0');

  console.log(`Application running on port ${port}`);
}

bootstrap();