import { Injectable } from '@nestjs/common';
import { QueryAnswersDto } from '../../../../helpers/constants/commonDTO/query.dto';
import { CreateQuestionDto, PublishDto, UpdateQuestionDto } from '../dto/sa-quiz.dto';

@Injectable()
export class SAquizRepo {
  constructor() {}

  async findAllQuestions(query: QueryAnswersDto){
    return 
  }

  async createOneQuestion(createQuestionDto: CreateQuestionDto){
    return 
  }

  async deleteQuestionById(id: string){
    return 
  }

  async updateQuestionById(id: string, updateQuestionDto: UpdateQuestionDto){
    return 
  }

  async publishQuestionById(id: string, publishDto: PublishDto){
    return 
  }

}