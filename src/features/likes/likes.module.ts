import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../outerservices/database/database.module';
import { LikesRepo } from './infrastructure/like.repo';
import { LikesSQL } from './infrastructure/like.repositorySQL';

@Module({
  controllers: [],
  imports: [DatabaseModule],
  providers: [
    LikesRepo,
    LikesSQL,
  ],
  exports: [
    LikesRepo,
  ]
})
export class LikesModule {}
