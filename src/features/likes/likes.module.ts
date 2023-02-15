import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './domain/entitites/likes.entity';
import { LikesRepo } from './infrastructure/like.repo';
import { LikesSQL } from './infrastructure/like.repositorySQL';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([LikeEntity])],
  providers: [
    LikesRepo,
    LikesSQL,
  ],
  exports: [
    LikesRepo, TypeOrmModule,
  ]
})
export class LikesModule {}
