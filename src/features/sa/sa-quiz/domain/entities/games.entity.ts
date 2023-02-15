import { UserEntity } from '../../../sa-users/domain/entitites/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class GamesEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  firstPlayerProgress: string;

  @Column('text')
  secondPlayerProgress: string;

  @Column('text')
  status: string;

  @Column('timestamp with time zone')
  pairCreatedDate: string;

  @Column('timestamp with time zone')
  startGameDate: string;

  @Column('timestamp with time zone')
  finishGameDate: string;

  @Column('uuid')
  userId: string;

}

@Entity('finished-games')
export class CurrentGamesEntity extends GamesEntity {

  @ManyToOne(() => UserEntity, user => user.currentGames)
  user: UserEntity

}

@Entity('finished-games')
export class FinishedGamesEntity extends GamesEntity {

  @ManyToOne(() => UserEntity, user => user.finishedGames)
  user: UserEntity

}
