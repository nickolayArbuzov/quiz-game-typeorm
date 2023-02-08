import { Module } from '@nestjs/common';
import { LikesRepo } from './infrastructure/like.repo';
import { LikesSQL } from './infrastructure/like.repositorySQL';

@Module({
  controllers: [],
  imports: [],
  providers: [
    LikesRepo,
    LikesSQL,
  ],
  exports: [
    LikesRepo,
  ]
})
export class LikesModule {}
