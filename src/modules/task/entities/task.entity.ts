import { TeacherCourse } from "src/modules/course/entities/teacher-course.entity";
import { FileEnt } from "src/modules/file/entities/file.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TeacherCourse)
    teacherCourse: TeacherCourse;

    @ManyToMany(() => FileEnt, (file) => file.task)
    @JoinTable({
        name: 'file_task',
        joinColumn:
        {
            name: 'task',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'FK_file_task_task'
        },
        inverseJoinColumn: {
            name: 'file',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'FK_file_task_file'
        },
    })
    files: FileEnt[];

    @Column()
    description: string;

    @CreateDateColumn()
    deadline: Date;

    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;
}