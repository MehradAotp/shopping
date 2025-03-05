import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { main as mainSwagger } from './swagger';
import { Logger as NestLogger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false,
  });
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:6003',
      'http://localhost:3000',
      'http://192.192.1.44:6003',
    ],
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });
  // for uploading base64 files
  app.use(bodyParser.json({ limit: '20mb' }));

  mainSwagger(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  NestLogger.log(`Application is running on: http://localhost:${port}`);
}

void bootstrap();
