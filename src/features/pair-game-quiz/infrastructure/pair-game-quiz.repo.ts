import { Injectable } from '@nestjs/common';
import { QueryTopDto, SendAnswerDto } from '../dto/pair-game-quiz.dto';
import { QueryBlogDto } from '../../../helpers/constants/commonDTO/query.dto';

@Injectable()
export class PairGameQuizRepo {
  constructor() {}

  async getTop(query: QueryTopDto, userId: string){
    return
  }

  async getMyStatictic(userId: string){
    return
  }

  async getMyGames(query: QueryBlogDto){
    return 
  }

  async getMyCurrentGame(userId: string){
    return 
  }

  async findOneGameById(id: string, userId: string){
    return 
  }

  async connectCurrentUser(userId: string){
    return 
  }

  async sendAnswerForNextQuestion(sendAnswerDto: SendAnswerDto, userId: string){
    return 
  }

}