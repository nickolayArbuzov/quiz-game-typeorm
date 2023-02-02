import {Body, Controller, Get, Param, Post, Query, UseGuards, Req} from '@nestjs/common';
import { Request } from 'express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { QueryBlogDto } from '../../../helpers/constants/commonDTO/query.dto';
import { JWTAuthGuard } from '../../../helpers/guards/jwt.guard';
import { GetMyGamesQuery } from '../application/use-cases/GetMyGames';
import { GetMyCurrentGameQuery } from '../application/use-cases/GetMyCurrentGame';
import { FindOneGameByIdQuery } from '../application/use-cases/FindOneGameById';
import { ConnectCurrentUserCommand } from '../application/use-cases/ConnectCurrentUser';
import { SendAnswerDto } from '../dto/pair-game-quiz.dto';
import { SendAnswerForNextQuestionCommand } from '../application/use-cases/SendAnswerForNextQuestion';

@Controller('pair-game-quiz/pairs')
export class PairGameQuizPairsController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    @UseGuards(JWTAuthGuard)
    @Get('my')
    async getMyGames(@Query() query: QueryBlogDto, @Req() req: Request){
        return await this.queryBus.execute(new GetMyGamesQuery(query, req.user?.userId))
    }

    @UseGuards(JWTAuthGuard)
    @Get('my-current')
    async getMyCurrentGame(@Req() req: Request){
        return await this.queryBus.execute(new GetMyCurrentGameQuery(req.user?.userId))
    }

    @UseGuards(JWTAuthGuard)
    @Get(':id')
    async findOneGameById(@Param('id') id: string, @Req() req: Request){
        return await this.queryBus.execute(new FindOneGameByIdQuery(id, req.user?.userId))
    }

    @UseGuards(JWTAuthGuard)
    @Post('connection')
    async connectCurrentUser(@Req() req: Request){
        return await this.commandBus.execute(new ConnectCurrentUserCommand(req.user?.userId))
    }

    @UseGuards(JWTAuthGuard)
    @Post('my-current/answers')
    async sendAnswerForNextQuestion(@Body() sendAnswerDto: SendAnswerDto, @Req() req: Request){
        return await this.commandBus.execute(new SendAnswerForNextQuestionCommand(sendAnswerDto, req.user?.userId))
    }

}