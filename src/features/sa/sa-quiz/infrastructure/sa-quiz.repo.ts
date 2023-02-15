import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { QueryAnswersDto } from '../../../../helpers/constants/commonDTO/query.dto';
import { QuestionEntity } from '../domain/entities/question.entity';
import { CreateQuestionDto, PublishDto, UpdateQuestionDto } from '../dto/sa-quiz.dto';

@Injectable()
export class SAquizRepo {
  constructor(
    @InjectDataSource() private readonly db: DataSource,
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
  ) {}

  async findAllQuestions(query: QueryAnswersDto){

    const sortDirection = query.sortDirection === 'asc' ? 'ASC' : 'DESC'
    const publishedStatus = query.publishedStatus === 'all' ? '' 
      : query.publishedStatus === 'published' ? true : false

    const repo = this.questionRepository.createQueryBuilder('question')

    if(query.bodySearchTerm && publishedStatus === '') {
      repo.where("LOWER(questions.body) like :name", { name: `%${query.bodySearchTerm.toLowerCase()}%` })
    }
    if(!query.bodySearchTerm && publishedStatus !== '') {
      repo.where({published: publishedStatus})
    }

    if(query.bodySearchTerm && publishedStatus !== '') {
      repo.where("LOWER(questions.body) like :name", { name: `%${query.bodySearchTerm.toLowerCase()}%` })
      repo.andWhere({published: publishedStatus})
    }
    
    const questions = await repo
      .skip(((+query.pageNumber-1) * +query.pageSize ))
      .take(+query.pageSize)
      .orderBy(`question.${query.sortBy ? query.sortBy : query.sortBy}`, sortDirection)
      .getMany()
    
    const count = await repo.getCount()
    
    return {
      page: +query.pageNumber,
      pageSize: +query.pageSize,
      pagesCount: Math.ceil(count/+query.pageSize),
      totalCount: count,
      items: questions,
    }
  }

  async createOneQuestion(createQuestionDto: CreateQuestionDto){
    const question = new QuestionEntity()
    await this.questionRepository.insert(question.create(createQuestionDto))
    return question
  }

  async deleteQuestionById(id: string){
    const deletedVideo = await this.questionRepository.delete(id)
    if(deletedVideo.affected){
      return deletedVideo
    } else {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
  }

  // TODO: create one fuction
  async updateQuestionById(id: string, updateDto: UpdateQuestionDto){
    const question = await this.questionRepository.findOneBy({id: id})
    if(question){
      await this.questionRepository.update(id, question.update(updateDto))
      return
    } else {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
  }

  // TODO: create one fuction
  async publishQuestionById(id: string, updateDto: PublishDto){
    const question = await this.questionRepository.findOneBy({id: id})
    if(question){
      await this.questionRepository.update(id, question.update(updateDto))
      return
    } else {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
  }

}