import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { CommonEntity } from 'src/common/entity/common.entity';

@Entity()
export class UserType extends CommonEntity {
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.usertype)
  @JoinColumn({ referencedColumnName: 'id', name: 'userType' })
  users: User[];
}
