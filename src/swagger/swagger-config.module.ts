import { Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConstants } from '../constants.config';
import * as fs from 'fs';

@Module({})
export class SwaggerConfigModule {
  static setup(app) {
    const options = new DocumentBuilder()
      .setTitle(AppConstants.API_NAME)
      .setDescription(AppConstants.API_DESCRIPTION)
      .setVersion(`Version: ${AppConstants.API_VERSION}`)
      .addServer(`http://localhost:3000`, 'Local server')
      .addTag('Ciudades', 'Gestión de ciudades')
      .addTag('Ciudad - Supermercado', 'Gestión de supermercados por ciudad ')
      .addTag('Supermercados', 'Gestión de supermercados')
      .build();

    const document = SwaggerModule.createDocument(app, options);

    fs.writeFileSync('./openapi/swagger-spec.json', JSON.stringify(document));
    SwaggerModule.setup(`/${AppConstants.API_DEFAULT_SWAGGER}`, app, document);
  }
}
