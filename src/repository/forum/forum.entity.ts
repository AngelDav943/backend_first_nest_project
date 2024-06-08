import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Forum {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    description: string;

    @Column()
    course: number;

    @CreateDateColumn()
    createddate: number;
    @CreateDateColumn()
    updateddate: number;
}