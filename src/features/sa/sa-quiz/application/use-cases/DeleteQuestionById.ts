import { CommandHandler } from '@nestjs/cqrs';
import { SAquizRepo } from '../../infrastructure/sa-quiz.repo';

export class DeleteQuestionByIdCommand {
  constructor(
    public id: string,
  ) {}
}

@CommandHandler(DeleteQuestionByIdCommand)
export class DeleteQuestionByIdUseCase {
  constructor(
    private sAquizRepo: SAquizRepo,
  ) {}

  async execute(command: DeleteQuestionByIdCommand){
    return await this.sAquizRepo.deleteQuestionById(command.id)
  }
}