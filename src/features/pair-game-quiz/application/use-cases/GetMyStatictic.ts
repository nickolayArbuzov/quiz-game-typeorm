import { QueryHandler } from '@nestjs/cqrs';
import { query } from 'express';
import { PairGameQuizRepo } from '../../infrastructure/pair-game-quiz.repo';

export class GetMyStatisticQuery {
  constructor(
    public userId: string,
  ) {}
}

@QueryHandler(GetMyStatisticQuery)
export class GetMyStaticticUseCase {
  constructor(
    private pairGameQuizRepo: PairGameQuizRepo,
  ) {}

  async execute(query: GetMyStatisticQuery){
    return await this.pairGameQuizRepo.getMyStatictic(query.userId)
  }
}