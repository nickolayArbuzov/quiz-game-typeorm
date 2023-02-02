import { QueryHandler } from '@nestjs/cqrs';
import { PairGameQuizRepo } from '../../infrastructure/pair-game-quiz.repo';

export class FindOneGameByIdQuery {
  constructor(
    public id: string,
    public userId: string,
  ) {}
}

@QueryHandler(FindOneGameByIdQuery)
export class FindOneGameByIdUseCase {
  constructor(
    private pairGameQuizRepo: PairGameQuizRepo,
  ) {}

  async execute(query: FindOneGameByIdQuery){
    return await this.pairGameQuizRepo.findOneGameById(query.id, query.userId)
  }
}