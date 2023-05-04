import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../../features/sa/sa-quiz/domain/entities/question.entity';
import { CurrentGamesEntity, FinishedGamesEntity } from '../../features/sa/sa-quiz/domain/entities/games.entity';
import { DeviceEntity } from '../../features/devices/domain/entitites/devices.entity';
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
    @InjectRepository(DeviceEntity)
    private deviceEntity: Repository<DeviceEntity>,
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async deleteAllData(): Promise<void> {
    await this.questionRepository.delete({})
    await this.currentGamesEntity.delete({})
    await this.finishedGamesEntity.delete({})
    await this.deviceEntity.delete({})
    await this.userEntity.delete({})
  }
  
}