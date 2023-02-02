import { QueryHandler } from '@nestjs/cqrs';
import { PairGameQuizRepo } from '../../infrastructure/pair-game-quiz.repo';
import { QueryBlogDto } from '../../../../helpers/constants/commonDTO/query.dto';

export class GetMyGamesQuery {
  constructor(
    public query: QueryBlogDto,
    public userId: string,
  ) {}
}

@QueryHandler(GetMyGamesQuery)
export class GetMyGamesUseCase {
  constructor(
    private pairGameQuizRepo: PairGameQuizRepo,
  ) {}

  async execute(command: GetMyGamesQuery){
    return await this.pairGameQuizRepo.getMyGames(command.query)
  }
}