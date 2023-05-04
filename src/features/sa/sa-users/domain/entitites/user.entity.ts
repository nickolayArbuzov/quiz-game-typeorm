import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CurrentGamesEntity, FinishedGamesEntity } from '../../../sa-quiz/domain/entities/games.entity';

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  passwordHash: string;

  @Column('text')
  passwordSalt: string;

  @Column('boolean')
  isActivated: boolean;

  @Column('text')
  code: string;

  @Column('timestamp with time zone')
  createdAt: string;

  @Column('boolean')
  isBanned: boolean;

  @Column({type: 'timestamp with time zone', nullable: true})
  banDate: string;

  @Column({type: 'timestamp with time zone', nullable: true})
  banReason: string;

  @Column('text')
  login: string;

  @Column('text')
  email: string;

  @OneToMany(() => CurrentGamesEntity, currentGame => currentGame.user)
  currentGames: CurrentGamesEntity[]

  @OneToMany(() => FinishedGamesEntity, finishedGame => finishedGame.user)
  finishedGames: FinishedGamesEntity[]

}
