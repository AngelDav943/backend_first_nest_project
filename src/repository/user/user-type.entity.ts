import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createddate: number;
    @CreateDateColumn()
    updateddate: number;

    @OneToMany(() => User, (user) => user.usertype)
    @JoinColumn({referencedColumnName: 'id', name: 'userType'})
    users: User[];

}