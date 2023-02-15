import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateQuestionDto, PublishDto, UpdateQuestionDto } from '../../dto/sa-quiz.dto';

@Entity('questions')
export class QuestionEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', collation: 'C' })
  body: string;

  @Column({ type: 'text', array: true, collation: 'C' })
  correctAnswers: string[];

  @Column('boolean')
  published: boolean;

  @Column('timestamp with time zone')
  createdAt: string;

  @Column({nullable: true, type: 'timestamp with time zone'})
  updatedAt: string;

  create(createQuestionDto: CreateQuestionDto) {
    this.body = createQuestionDto.body
    this.correctAnswers = createQuestionDto.correctAnswers
    this.published = false
    this.createdAt = new Date().toISOString()
    this.updatedAt = null
    return this
  }

  update(updateData: UpdateQuestionDto | PublishDto) {
    if(updateData instanceof UpdateQuestionDto){
      this.body = updateData.body
      this.correctAnswers = updateData.correctAnswers
    }
    if(updateData instanceof PublishDto){
      this.published = updateData.published
    }
    this.updatedAt = new Date().toISOString()
    return this
  }
}
