import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Course } from './course.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { CommonEntity } from 'src/common/entity/common.entity';

@Entity()
export class TeacherCourse extends CommonEntity {
  @ManyToOne(() => Course)
  @JoinColumn({ referencedColumnName: 'id', name: 'course' })
  course: Course;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id', name: 'teacher' })
  teacher: User;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'teacher_course_student',
    joinColumn: {
      name: 'teacherCourse',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_teacher_course_student_teacher_course',
    },
    inverseJoinColumn: {
      name: 'student',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_teacher_course_student_user',
    },
  })
  students: User[];

  @OneToMany(() => Task, (task) => task.teacherCourse)
  tasks: Task[];

  @Column()
  hours: number;

  @Column({ nullable: true })
  day: string;
}
