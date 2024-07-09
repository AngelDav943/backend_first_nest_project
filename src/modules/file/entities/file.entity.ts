import { TaskStudent } from "src/modules/task/entities/task-student.entity";
import { Task } from "src/modules/task/entities/task.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'file' })
export class FileEnt {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Task)
    @JoinTable({
        name: 'file_task',
        joinColumn: {
            name: 'task',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'file_task_ibfk_1'
        },
        inverseJoinColumn:
        {
            name: 'file',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'file_task_ibfk_2'
        }
    })
    task: Task[];

    @Column()
    name: string;
    @Column()
    url: string;
    @Column()
    extension: string;
    @Column()
    size: number;

    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;
}