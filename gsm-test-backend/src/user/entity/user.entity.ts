import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common/entity/abstract.entity';

@Entity({name: "users"})
export class User extends AbstractEntity {

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

}
