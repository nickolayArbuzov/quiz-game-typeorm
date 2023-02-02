import { CommandHandler } from '@nestjs/cqrs';
import { UpdateQuestionDto } from '../../dto/sa-quiz.dto';
import { SAquizRepo } from '../../infrastructure/sa-quiz.repo';

export class UpdateQuestionByIdCommand {
  constructor(
    public id: string,
    public updateQuestionDto: UpdateQuestionDto, 
  ) {}
}

@CommandHandler(UpdateQuestionByIdCommand)
export class UpdateQuestionByIdUseCase {
  constructor(
    private sAquizRepo: SAquizRepo,
  ) {}

  async execute(command: UpdateQuestionByIdCommand){
    return await this.sAquizRepo.updateQuestionById(command.id, command.updateQuestionDto)
  }
}