import { Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConstants } from '../constants.config';

@Module({})
export class SwaggerConfigModule {
  static setup(app) {
    const options = new DocumentBuilder()
      .setTitle(AppConstants.API_NAME)
      .setDescription(AppConstants.API_DESCRIPTION)
      .setVersion(`Version: ${AppConstants.API_VERSION}`)
      .addServer(`http://localhost:3000`, 'Local server')
      .addTag('Ciudad', 'Gestión de ciudades')
      .addTag('Ciudad - Supermercado', 'Gestión de supermercados por ciudad ')
      .addTag('Supermercado', 'Gestión de supermercados')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`/${AppConstants.API_DEFAULT_SWAGGER}`, app, document);
  }
}
