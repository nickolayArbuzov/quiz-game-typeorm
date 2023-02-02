import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../../../outerservices/database/database.module';
import { QuizQuestionsController } from './api/sa-quiz.controller';
import { SAquizRepo } from './infrastructure/sa-quiz.repo';
import { UpdateQuestionByIdUseCase } from './application/use-cases/UpdateQuestionById';
import { PublishQuestionByIdUseCase } from './application/use-cases/PublishQuestionById';
import { FindAllQuestionsUseCase } from './application/use-cases/FindAllQuestions';
import { DeleteQuestionByIdUseCase } from './application/use-cases/DeleteQuestionbyId';
import { CreateOneQuestionUseCase } from './application/use-cases/CreateOneQuestion';

const commands = [CreateOneQuestionUseCase, DeleteQuestionByIdUseCase, UpdateQuestionByIdUseCase, PublishQuestionByIdUseCase]
const queries = [FindAllQuestionsUseCase]

@Module({
  controllers: [QuizQuestionsController],
  imports: [DatabaseModule, CqrsModule],
  providers: [
    SAquizRepo,
    ...commands,
    ...queries,
  ],
  exports: [

  ]

})
export class SAQuizModule {}
