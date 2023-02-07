import { DataSource } from 'typeorm';
import { QuestionEntity } from '../domain/entity/question.entity';

export const questionProviders = [
  {
    provide: 'QUESTION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(QuestionEntity),
    inject: ['DATA_SOURCE'],
  },
];