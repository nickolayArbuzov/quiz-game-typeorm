import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionEntity } from '../../features/sa/sa-quiz/domain/entity/question.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  /*{
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASS'),
        database: configService.get('POSTGRES_DB'),
        entities: [QuestionEntity],
        synchronize: true,
        ssl: {rejectUnauthorized: false},
        poolSize: 5,
        extra: {
          connectionLimit: 5,
          max: 5,
          connectionTimeoutMillis: 1000,
        },
      });
      return dataSource.initialize();
    },
  },*/
];