import { FileEnt } from "src/modules/file/entities/file.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./task.entity";

// Task Answer Student

@Entity()
export class TaskStudent {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(() => FileEnt)
    // file: FileEnt;

    @ManyToOne(() => Task)
    task: Task;

    @Column()
    grade: number;

    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;
}