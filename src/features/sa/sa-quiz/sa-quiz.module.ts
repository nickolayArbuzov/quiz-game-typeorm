import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { QuizQuestionsController } from './api/sa-quiz.controller';
import { SAquizRepo } from './infrastructure/sa-quiz.repo';
import { UpdateQuestionByIdUseCase } from './application/use-cases/UpdateQuestionById';
import { PublishQuestionByIdUseCase } from './application/use-cases/PublishQuestionById';
import { FindAllQuestionsUseCase } from './application/use-cases/FindAllQuestions';
import { CreateOneQuestionUseCase } from './application/use-cases/CreateOneQuestion';
import { DeleteQuestionByIdUseCase } from './application/use-cases/DeleteQuestionById';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './domain/entities/question.entity';

const commands = [CreateOneQuestionUseCase, DeleteQuestionByIdUseCase, UpdateQuestionByIdUseCase, PublishQuestionByIdUseCase]
const queries = [FindAllQuestionsUseCase]

@Module({
  controllers: [QuizQuestionsController],
  imports: [TypeOrmModule.forFeature([QuestionEntity]), CqrsModule],
  providers: [
    SAquizRepo,
    ...commands,
    ...queries,
  ],
  exports: [
    TypeOrmModule
  ]

})
export class SAQuizModule {}
