import { CommandHandler } from '@nestjs/cqrs';
import { SAquizRepo } from '../../infrastructure/sa-quiz.repo';
import { CreateQuestionDto } from '../../dto/sa-quiz.dto';

export class CreateOneQuestionCommand {
  constructor(
    public createQuestionDto: CreateQuestionDto,
  ) {}
}

@CommandHandler(CreateOneQuestionCommand)
export class CreateOneQuestionUseCase {
  constructor(
    private sAquizRepo: SAquizRepo,
  ) {}

  async execute(command: CreateOneQuestionCommand){
    return await this.sAquizRepo.createOneQuestion(command.createQuestionDto)
  }
}