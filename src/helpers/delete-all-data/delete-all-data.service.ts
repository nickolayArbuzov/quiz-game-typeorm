import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../../features/sa/sa-quiz/domain/entities/question.entity';
import { CurrentGamesEntity, FinishedGamesEntity } from '../../features/sa/sa-quiz/domain/entities/games.entity';
import { BloggerUserEntity } from '../../features/blogger/blogger-user/domain/entitites/blogger-user.entity';
import { BlogEntity } from '../../features/blogs/entitites/blogs.entity';
import { CommentEntity } from '../../features/comments/domain/entitites/comments.entity';
import { DeviceEntity } from '../../features/devices/domain/entitites/devices.entity';
import { LikeEntity } from '../../features/likes/domain/entitites/likes.entity';
import { PostEntity } from '../../features/posts/domain/entitites/posts.entity';
import { UserEntity } from '../../features/sa/sa-users/domain/entitites/user.entity';

@Injectable()
export class AllDataService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
    @InjectRepository(CurrentGamesEntity)
    private currentGamesEntity: Repository<CurrentGamesEntity>,
    @InjectRepository(FinishedGamesEntity)
    private finishedGamesEntity: Repository<FinishedGamesEntity>,
    @InjectRepository(BloggerUserEntity)
    private bloggerUserEntity: Repository<BloggerUserEntity>,
    @InjectRepository(BlogEntity)
    private blogEntity: Repository<BlogEntity>,
    @InjectRepository(CommentEntity)
    private commentEntity: Repository<CommentEntity>,
    @InjectRepository(DeviceEntity)
    private deviceEntity: Repository<DeviceEntity>,
    @InjectRepository(LikeEntity)
    private likeEntity: Repository<LikeEntity>,
    @InjectRepository(PostEntity)
    private postEntity: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async deleteAllData(): Promise<void> {
    await this.questionRepository.delete({})
    await this.currentGamesEntity.delete({})
    await this.finishedGamesEntity.delete({})
    await this.bloggerUserEntity.delete({})
    await this.blogEntity.delete({})
    await this.commentEntity.delete({})
    await this.deviceEntity.delete({})
    await this.likeEntity.delete({})
    await this.postEntity.delete({})
    await this.userEntity.delete({})
  }
  
}