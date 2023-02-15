import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../sa/sa-users/domain/entitites/user.entity';
import { CommentEntity } from '../../../comments/domain/entitites/comments.entity';
import { PostEntity } from '../../../posts/domain/entitites/posts.entity';

@Entity('likes')
export class LikeEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('boolean')
  banned: boolean;

  @Column('text')
  login: string;

  @Column('uuid')
  postId: string;

  @Column('uuid')
  commentId: string;

  @Column('timestamp with time zone')
  addadAt: string;

  @Column('text')
  status: string;

  @ManyToOne(() => UserEntity, user => user.likes)
  user: UserEntity

  @ManyToOne(() => PostEntity, post => post.likes)
  post: PostEntity

  @ManyToOne(() => CommentEntity, comment => comment.likes)
  comment: CommentEntity

}
