import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from '../../features/sa/sa-quiz/domain/entities/question.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AllDataService {
  constructor(
    @InjectDataSource() private readonly db: DataSource,
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
  ) {}

  async deleteAllData(): Promise<void> {
    await this.db.query(`
      delete from "blogger-users";
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