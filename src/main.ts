import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigModule } from './swagger/swagger-config.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { Logger, VersioningType } from '@nestjs/common';
import { AppConstants } from './constants.config';

async function bootstrap() {
  const logger = new Logger('Main');
  const port = AppConstants.API_PORT;
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalFilters(new HttpExceptionFilter())
    .enableVersioning({
      type: VersioningType.URI,
      prefix: `${AppConstants.API_PREFIX}`,
      defaultVersion: AppConstants.API_VERSION,
    })
    .enableCors();
  SwaggerConfigModule.setup(app);
  await app.listen(port);
  const apiEndpoint = `http://localhost:${port}`;
  logger.debug(
    `>>> Application is running on: ${apiEndpoint}/${AppConstants.API_PREFIX}${AppConstants.API_VERSION}`,
  );
  logger.debug(
    `>>> Application documentation running on: ${apiEndpoint}/${AppConstants.API_DEFAULT_SWAGGER}`,
  );
}

bootstrap();
