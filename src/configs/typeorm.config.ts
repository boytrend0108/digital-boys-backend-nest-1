import { ConfigService } from '@nestjs/config';

export const gettTypeOrmConfig = async (configService: ConfigService) => ({
  type: 'postgres' as const,
  host: configService.getOrThrow<string>('POSTGRES_HOST'),
  port: +configService.getOrThrow<number>('POSTGRES_PORT'),
  username: configService.getOrThrow<string>('POSTGRES_USER'),
  password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
  database: configService.getOrThrow<string>('POSTGRES_DB'),
  synchronize: true,
  autoLoadEntities: true,
});
