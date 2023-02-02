import { QueryHandler } from '@nestjs/cqrs';
import { PairGameQuizRepo } from '../../infrastructure/pair-game-quiz.repo';

export class GetMyCurrentGameQuery {
  constructor(
    public userId: string,
  ) {}
}

@QueryHandler(GetMyCurrentGameQuery)
export class GetMyCurrentGameUseCase {
  constructor(
    private pairGameQuizRepo: PairGameQuizRepo,
  ) {}

  async execute(command: GetMyCurrentGameQuery){
    return await this.pairGameQuizRepo.getMyCurrentGame(command.userId)
  }
}