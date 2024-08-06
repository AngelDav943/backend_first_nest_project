import { Exclude } from 'class-transformer';
import { CommonEntity } from 'src/common/entity/common.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { UserType } from './user-type.entity';

/**
 *
 */
@Entity()
export class User extends CommonEntity {
    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ unique: true })
    email: string;
    @Column({ nullable: true })
    address: string;

    @CreateDateColumn()
    birthday: Date;

    @ManyToOne(() => UserType, (userType) => userType.users)
    @JoinColumn({ referencedColumnName: 'id', name: 'usertype' })
    // @Transform((role) => role.type)
    usertype: UserType;
}
