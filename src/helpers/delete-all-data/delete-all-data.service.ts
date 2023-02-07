import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { QuestionEntity } from '../../features/sa/sa-quiz/domain/entity/question.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AllDataService {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly db: DataSource,
    @Inject('QUESTION_REPOSITORY')
    private questionRepository: Repository<QuestionEntity>,
  ) {}

  async deleteAllData(): Promise<void> {
    await this.db.query(`
      delete from "bloggerUser";
      delete from blogs;
      delete from comments;
      delete from devices;
      delete from likes;
      delete from posts;
      delete from users;
    `);
    await this.questionRepository.delete({})
  }
  
}