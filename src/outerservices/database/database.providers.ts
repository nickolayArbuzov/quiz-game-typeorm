import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionEntity } from '../../features/sa/sa-quiz/domain/entity/question.entity';
import { DataSource } from 'typeorm';
import * as config from '../../config/database'


export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASS,
        database: process.env.POSTGRES_DB,
        entities: [QuestionEntity],
        synchronize: true,
        ssl: {rejectUnauthorized: false}
      });
      return dataSource.initialize();
    },
  },
];