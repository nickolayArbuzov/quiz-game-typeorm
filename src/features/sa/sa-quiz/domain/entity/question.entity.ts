import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('questions')
export class QuestionEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'text', collation: 'C' })
  body: string;

  @Column({ type: 'text', array: true, collation: 'C' })
  correctAnswers: string[];

  @Column('boolean')
  published: boolean;

  @Column('timestamp with time zone')
  createdAt: Date;

  @Column('timestamp with time zone')
  updatedAt: Date;
}
