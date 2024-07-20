import { FileEnt } from 'src/modules/file/entities/file.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Task } from './task.entity';

import { TeacherCourseStudent } from 'src/modules/course/entities/teacher-course-student.entity';
import { CommonEntity } from 'src/common/entity/common.entity';

// Task Answer Student

@Entity()
export class TaskStudent extends CommonEntity {
  @ManyToOne(() => TeacherCourseStudent)
  teacherCourseStudent: TeacherCourseStudent;

  @ManyToMany(() => FileEnt)
  @JoinTable({
    name: 'file_task_student',
    joinColumn: {
      name: 'taskStudent',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK__task_student',
    },
    inverseJoinColumn: {
      name: 'file',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK__file',
    },
  })
  files: FileEnt[];

  @ManyToOne(() => Task, (task) => task.answers)
  task: Task;

  @Column()
  grade: number;
}
