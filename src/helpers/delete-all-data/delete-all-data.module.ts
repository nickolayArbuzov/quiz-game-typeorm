import { Module } from '@nestjs/common';
import { DevicesModule } from '../../features/devices/devices.module';
import { SAUsersModule } from '../../features/sa/sa-users/sa-users.module';
import { AllDataController } from './delete-all-data.controller';
import { AllDataService } from './delete-all-data.service';
import { SAQuizModule } from '../../features/sa/sa-quiz/sa-quiz.module';

@Module({
  controllers: [AllDataController],
  imports: [SAUsersModule, DevicesModule, SAQuizModule],
  providers: [
    AllDataService,
  ],
})
export class AllDataModule {}
