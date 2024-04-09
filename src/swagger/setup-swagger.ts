import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { tags } from './tags.constant';

export const setupSwagger = (app: INestApplication) => {
  const builder = new DocumentBuilder()
    .setTitle('Refinancy Example')
    .setDescription('The Refinancy API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addBasicAuth();

  Object.values(tags).map((tag) => {
    builder.addTag(tag.name, tag.description);
  });

  const config = builder.build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
