import { CommandHandler } from '@nestjs/cqrs';
import { PairGameQuizRepo } from '../../infrastructure/pair-game-quiz.repo';

export class ConnectCurrentUserCommand {
  constructor(
    public userId: string,
  ) {}
}

@CommandHandler(ConnectCurrentUserCommand)
export class ConnectCurrentUserUseCase {
  constructor(
    private pairGameQuizRepo: PairGameQuizRepo,
  ) {}

  async execute(command: ConnectCurrentUserCommand){
    return await this.pairGameQuizRepo.connectCurrentUser(command.userId)
  }
}