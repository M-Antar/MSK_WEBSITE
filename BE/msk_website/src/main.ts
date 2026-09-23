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
        origin === 'https://mskbrand.com' ||
        origin === 'https://www.mskbrand.com' ||
        origin.endsWith('.vercel.app') ||
        // Allow any device on a local Wi-Fi/LAN network during development
        // (e.g. testing from a phone via http://192.168.x.x:8080)
        /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(origin) ||
        /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(origin) ||
        /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(
          origin,
        );

      if (allowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },

    credentials: true,

    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  });

  const port = Number(process.env.PORT) || 8080;

  await app.listen(port, '0.0.0.0');

  console.log(`Application running on port ${port}`);
}

bootstrap();