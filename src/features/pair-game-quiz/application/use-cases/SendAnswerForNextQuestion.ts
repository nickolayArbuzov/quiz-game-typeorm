import { CommandHandler } from '@nestjs/cqrs';
import { PairGameQuizRepo } from '../../infrastructure/pair-game-quiz.repo';
import { SendAnswerDto } from '../../dto/pair-game-quiz.dto';

export class SendAnswerForNextQuestionCommand {
  constructor(
    public sendAnswerDto: SendAnswerDto,
    public userId: string,
  ) {}
}

@CommandHandler(SendAnswerForNextQuestionCommand)
export class SendAnswerForNextQuestionUseCase {
  constructor(
    private pairGameQuizRepo: PairGameQuizRepo,
  ) {}

  async execute(command: SendAnswerForNextQuestionCommand){
    return await this.pairGameQuizRepo.sendAnswerForNextQuestion(command.sendAnswerDto, command.userId)
  }
}