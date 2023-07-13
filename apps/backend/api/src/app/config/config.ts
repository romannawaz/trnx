import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export interface Configuration {
  port: number;
  prefix: string;
  mongoConfig: MongooseModuleFactoryOptions;
  cors: CorsOptions;
}

export function getMongooseConfig(): MongooseModuleFactoryOptions {
  return {
    uri: process.env.MONGO_URI ?? '',
    retryWrites: true,
    writeConcern: { w: 'majority' },
  };
}

export function getCorsConfig(): CorsOptions {
  return {
    origin: process.env.CORS_ORIGIN ?? ['localhost:4200', 'localhost:4000'],
    credentials: process.env.CORS_CREDENTIALS
      ? process.env?.CORS_CREDENTIALS === 'true'
      : true,
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS ?? [
      'Content-Type',
      'Authorization',
      'User-Agent',
      'Enctype',
      'Cache-Control',
    ],
    methods: process.env.CORS_METHODS ?? 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
}

export function configurationFactory(): Configuration {
  return {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    prefix: process.env.PREFIX ?? 'api',
    mongoConfig: getMongooseConfig(),
    cors: getCorsConfig(),
  };
}

export async function mongooseFactory(): Promise<MongooseModuleFactoryOptions> {
  return getMongooseConfig();
}
