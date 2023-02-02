import { Transform, TransformFnParams } from "class-transformer";
import { IsArray, IsBoolean, IsString, Length, Matches } from "class-validator";

export class CreateQuestionDto {
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsString()
    @Length(10, 500)
    readonly body: string

    @IsArray()
    readonly correctAnswers: any[]
}

export class UpdateQuestionDto extends CreateQuestionDto {}

export class PublishDto {
    @IsBoolean()
    readonly published: boolean
}
