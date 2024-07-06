import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TeacherCourseStudent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teacherCourse: number;

    @ManyToOne(() => User)
    @JoinColumn({ referencedColumnName: 'id', name: 'user' })
    user: number;

    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;
}