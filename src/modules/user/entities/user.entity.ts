import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "./user-type.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    password: string;
    @Column({unique: true})
    email: string;
    @Column({nullable: true})
    address: string;

    @CreateDateColumn()
    birthday: Date;
    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;

    @ManyToOne(() => UserType, (userType) => userType.users)
    @JoinColumn({ referencedColumnName: 'id', name: 'usertype' })
    usertype: UserType;
}