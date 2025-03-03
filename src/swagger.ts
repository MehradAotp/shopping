import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export const main = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Shopping API')
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth()
    .addApiKey({ type: 'apiKey', name: 'Api-Key', in: 'header' }, 'Api-Key')
    .build();

  const appDocument = SwaggerModule.createDocument(app, config, {
    include: [AppModule],
    operationIdFactory(controllerKey, methodKey) {
      return methodKey;
    },
  });
  SwaggerModule.setup('swagger', app, appDocument);
};
