import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { PairGameQuizUsersController } from './api/users.controller';
import { PairGameQuizPairsController } from './api/pair.controller';
import { ConnectCurrentUserUseCase } from './application/use-cases/ConnectCurrentUser';
import { FindOneGameByIdUseCase } from './application/use-cases/FindOneGameById';
import { GetMyCurrentGameUseCase } from './application/use-cases/GetMyCurrentGame';
import { GetMyGamesUseCase } from './application/use-cases/GetMyGames';
import { GetMyStaticticUseCase } from './application/use-cases/GetMyStatictic';
import { GetTopUseCase } from './application/use-cases/GetTop';
import { SendAnswerForNextQuestionUseCase } from './application/use-cases/SendAnswerForNextQuestion';
import { PairGameQuizRepo } from './infrastructure/pair-game-quiz.repo';

const commands = [ConnectCurrentUserUseCase, SendAnswerForNextQuestionUseCase]
const queries = [FindOneGameByIdUseCase, GetMyCurrentGameUseCase, GetMyGamesUseCase, GetMyStaticticUseCase, GetTopUseCase]

@Module({
  controllers: [PairGameQuizPairsController, PairGameQuizUsersController],
  imports: [CqrsModule],
  providers: [
    PairGameQuizRepo,
    JwtService,
    ...commands,
    ...queries,
  ],
  exports: [

  ]
})
export class PairGameQuizModule {}
