import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllDataModule } from './helpers/delete-all-data/delete-all-data.module';
import { SAUsersModule } from './features/sa/sa-users/sa-users.module';
import { AuthModule } from './features/auth/auth.module';
import { DevicesModule } from './features/devices/devices.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './features/sa/sa-quiz/domain/entities/question.entity';
import { SAQuizModule } from './features/sa/sa-quiz/sa-quiz.module';
import { PairGameQuizModule } from './features/pair-game-quiz/pair-game-quiz.module';
import { CurrentGamesEntity, FinishedGamesEntity } from './features/sa/sa-quiz/domain/entities/games.entity';
import { DeviceEntity } from './features/devices/domain/entitites/devices.entity';
import { UserEntity } from './features/sa/sa-users/domain/entitites/user.entity';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
  ],
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({inject: [ConfigService], useFactory: (configService: ConfigService) => {
      return {
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        autoLoadEntities: false,
        synchronize: true,
        poolSize: 5,
        extra: {
          connectionLimit: 5,
          max: 5,
          connectionTimeoutMillis: 1000,
        },
        entities: [
          QuestionEntity, CurrentGamesEntity, FinishedGamesEntity, DeviceEntity, UserEntity,
        ]
      }
    }}),
    SAUsersModule,
    AuthModule,
    DevicesModule,
    AllDataModule,
    SAQuizModule,
    PairGameQuizModule,
  ],
})
export class AppModule {}

