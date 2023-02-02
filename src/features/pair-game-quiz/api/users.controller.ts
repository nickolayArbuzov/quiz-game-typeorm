import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import { ExtractUserFromToken } from '../../../helpers/guards/extractUserFromToken.guard';
import { GetTopQuery } from '../application/use-cases/GetTop';
import { GetMyStatisticQuery } from '../application/use-cases/GetMyStatictic';
import { QueryTopDto } from '../dto/pair-game-quiz.dto';

@Controller('pair-game-quiz/users')
export class PairGameQuizUsersController {
    constructor(
        private queryBus: QueryBus,
    ) {}

    @Get('top')
    async getTop(@Query() query: QueryTopDto, @Req() req: Request){
        return await this.queryBus.execute(new GetTopQuery(query, req.user?.userId))
    }
    
    @UseGuards(ExtractUserFromToken)
    @Get('my-statistic')
    async getMyStatictic(@Req() req: Request){
        return await this.queryBus.execute(new GetMyStatisticQuery(req.user?.userId))
    }

}