import { CommandHandler } from '@nestjs/cqrs';
import { PublishDto } from '../../dto/sa-quiz.dto';
import { SAquizRepo } from '../../infrastructure/sa-quiz.repo';

export class PublishQuestionByIdCommand {
  constructor(
    public id: string, 
    public publishDto: PublishDto
  ) {}
}

@CommandHandler(PublishQuestionByIdCommand)
export class PublishQuestionByIdUseCase {
  constructor(
    private sAquizRepo: SAquizRepo,
  ) {}

  async execute(command: PublishQuestionByIdCommand){
    return await this.sAquizRepo.publishQuestionById(command.id, command.publishDto)
  }
}