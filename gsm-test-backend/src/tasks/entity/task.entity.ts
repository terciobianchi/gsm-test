import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../common/entity/abstract.entity';
import { User } from 'src/user/entity/user.entity';

@Entity({name: "tasks"})
export class Task extends AbstractEntity {

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column({name: 'created_at', default: new Date()})
  createdAt: Date;

  // @Column({name: "user_id"})
  // userId: number; 
  
  @ManyToOne(type => User, {eager: true})
  @JoinColumn({ name: "user_id"})
  user: User;

}