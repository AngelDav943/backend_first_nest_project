import { TaskStudent } from "src/modules/task/entities/task-student.entity";
import { Task } from "src/modules/task/entities/task.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'file' })
export class FileEnt {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TaskStudent, (taskStudent) => taskStudent.files)
    // @JoinColumn({referencedColumnName:'taskStudentId', foreignKeyConstraintName:'id'})
    taskStudent: TaskStudent;

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