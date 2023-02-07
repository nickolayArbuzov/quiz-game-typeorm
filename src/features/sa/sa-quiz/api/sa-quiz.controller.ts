import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { QueryAnswersDto } from '../../../../helpers/constants/commonDTO/query.dto';
import { BasicAuthGuard } from '../../../../helpers/guards/auth.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PublishQuestionByIdCommand } from '../application/use-cases/PublishQuestionById';
import { UpdateQuestionByIdCommand } from '../application/use-cases/UpdateQuestionById';
import { FindAllQuestionsQuery } from '../application/use-cases/FindAllQuestions';
import { CreateOneQuestionCommand } from '../application/use-cases/CreateOneQuestion';
import { DeleteQuestionByIdCommand } from '../application/use-cases/DeleteQuestionById';
import { CreateQuestionDto, PublishDto, UpdateQuestionDto } from '../dto/sa-quiz.dto';

@UseGuards(BasicAuthGuard)
@Controller('sa/quiz/questions')
export class QuizQuestionsController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    @Get()
    async findAllQuestions(@Query() queryAnswersDto: QueryAnswersDto){
        return await this.queryBus.execute(new FindAllQuestionsQuery(queryAnswersDto))
    }

    @Post()
    async createOneQuestion(@Body() createQuestionDto: CreateQuestionDto){
        return await this.commandBus.execute(new CreateOneQuestionCommand(createQuestionDto))
    }

    @HttpCode(204)
    @Delete(':id')
    async deleteQuestionById(@Param('id') id: string){
        return await this.commandBus.execute(new DeleteQuestionByIdCommand(id))
    }

    @HttpCode(204)
    @Put(':id')
    async updateQuestionById(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto){
        return await this.commandBus.execute(new UpdateQuestionByIdCommand(id, updateQuestionDto))
    }

    @HttpCode(204)
    @Put(':id/publish')
    async publishQuestionById(@Param('id') id: string, @Body() publishDto: PublishDto){
        return await this.commandBus.execute(new PublishQuestionByIdCommand(id, publishDto))
    }
    
}