import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { CommonEntity } from 'src/common/entity/common.entity';

@Entity()
export class CourseState extends CommonEntity {
  @Column()
  name: string;

  @OneToMany(() => Course, (course) => course.state)
  @JoinColumn({ referencedColumnName: 'id', name: 'state' })
  courses: Course[];
}
