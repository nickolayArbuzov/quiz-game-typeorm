import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from '../../helpers/helpers/jwt';
import { DatabaseModule } from '../../outerservices/database/database.module';
import { DevicesController } from './api/devices.controller';
import { DevicesService } from './application/devices.service';
import { DevicesRepo } from './infrastructure/devices.repo';
import { FindAllDevicesByCurrentUserIdUseCase } from './application/use-cases/FindAllDevicesByCurrentUserId';
import { DeleteOneDeviceByIdUseCase } from './application/use-cases/DeleteOneDeviceById';
import { DeleteAllDeviceByCurrentUserIdExceptCurrentDeviceUseCase } from './application/use-cases/DeleteAllDeviceByCurrentUserIdExceptCurrentDevice';
import { CqrsModule } from '@nestjs/cqrs';
import { DevicesSQL } from './infrastructure/devices.repositorySQL';

const commands = [DeleteOneDeviceByIdUseCase, DeleteAllDeviceByCurrentUserIdExceptCurrentDeviceUseCase]
const queries = [FindAllDevicesByCurrentUserIdUseCase]

@Module({
  controllers: [DevicesController],
  imports: [DatabaseModule, JwtModule, CqrsModule],
  providers: [
    DevicesService,
    DevicesRepo,
    DevicesSQL,
    JWT,
    ...commands,
    ...queries,
  ],
  exports: [
    DevicesRepo,
  ]
})
export class DevicesModule {}
