import { TaskStudent } from "src/modules/task/entities/task-student.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TeacherCourseStudent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teacherCourse: number;

    @ManyToOne(() => User)
    user: User;

    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;
}