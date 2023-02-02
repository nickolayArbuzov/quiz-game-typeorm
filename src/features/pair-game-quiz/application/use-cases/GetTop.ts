import { QueryHandler } from '@nestjs/cqrs';
import { QueryTopDto } from '../../dto/pair-game-quiz.dto';
import { PairGameQuizRepo } from '../../infrastructure/pair-game-quiz.repo';

export class GetTopQuery {
  constructor(
    public query: QueryTopDto,
    public userId: string,
  ) {}
}

@QueryHandler(GetTopQuery)
export class GetTopUseCase {
  constructor(
    private pairGameQuizRepo: PairGameQuizRepo,
  ) {}

  async execute(query: GetTopQuery){
    return await this.pairGameQuizRepo.getTop(query.query, query.userId)
  }
}