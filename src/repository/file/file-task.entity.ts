import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileTask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    task: number;
    @Column()
    file: number;

    @CreateDateColumn()
    createddate: number;
    @CreateDateColumn()
    updateddate: number;
}