import { Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConstants } from '../constants.config';

@Module({})
export class SwaggerConfigModule {
  static setup(app) {
    const options = new DocumentBuilder()
      .setTitle('Supermarket API')
      .setDescription(
        `API para la consulta de la oferta de supermercados en las ciudades`,
      )
      .setVersion('latest')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(
      `${AppConstants.API_PREFIX}/v${AppConstants.API_VERSION}/docs`,
      app,
      document,
    );
  }
}
