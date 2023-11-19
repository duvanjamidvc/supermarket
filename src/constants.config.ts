export class AppConstants {
  static readonly API_VERSION: string = '1';
  static readonly API_PREFIX: string = 'api/v';
  static readonly API_NAME: string = 'Supermarket API';
  static readonly API_DESCRIPTION: string =
    'API para la consulta de la oferta de supermercados en las ciudades';
  static readonly API_DEFAULT_SWAGGER: string = 'docs';
  static API_PORT: number = parseInt(process.env.PORT) || 3000;
}
