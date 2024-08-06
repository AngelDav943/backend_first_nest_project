import { CommonEntity } from 'src/common/entity/common.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

/**
 *
 */
@Entity()
export class Evaluation extends CommonEntity {
    @ManyToOne(() => Course, (course) => course.evaluations)
    course: Course;

    @Column()
    description: string;
}
