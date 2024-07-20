import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserType } from './user-type.entity';
import { CommonEntity } from 'src/common/entity/common.entity';

@Entity()
export class User extends CommonEntity {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column({ nullable: true })
  address: string;

  @CreateDateColumn()
  birthday: Date;

  @ManyToOne(() => UserType, (userType) => userType.users)
  @JoinColumn({ referencedColumnName: 'id', name: 'usertype' })
  usertype: UserType;
}
