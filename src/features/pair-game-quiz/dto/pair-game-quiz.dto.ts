import { Transform, TransformFnParams } from "class-transformer";
import { IsString, Length } from "class-validator";

export class SendAnswerDto {
    @IsString()
    readonly answer: string;
}

export class QueryTopDto {
    readonly sort: string[];
    readonly pageNumber: string;
    readonly pageSize: string;
}