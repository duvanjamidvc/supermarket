import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigModule } from './swagger/swagger-config.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { Logger, VersioningOptions, VersioningType } from '@nestjs/common';
import { AppConstants } from './constants.config';

async function bootstrap() {
  const logger = new Logger('Main');
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  const apiOptions = {
    type: VersioningType.URI,
    prefix: `${AppConstants.API_PREFIX}/v`,
    defaultVersion: AppConstants.API_VERSION,
  };
  app.enableVersioning(apiOptions as unknown as VersioningOptions);
  SwaggerConfigModule.setup(app);
  await app.listen(port);
  const apiEndpoint = `http://localhost:${port}/${apiOptions.prefix}${apiOptions.defaultVersion}`;
  logger.debug(`>>> Application is running on: ${apiEndpoint}`);

  logger.debug(
    `>>> Application documentation running on: ${apiEndpoint}/${AppConstants.API_DEFAULT_SWAGGER}`,
  );
}

bootstrap();
