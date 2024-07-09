import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class UserType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;

    @OneToMany(() => User, (user) => user.usertype)
    @JoinColumn({referencedColumnName: 'id', name: 'userType'})
    users: User[];

}