import { CommonEntity } from 'src/common/entity/common.entity';
import { Evaluation } from 'src/modules/evaluation/entities/evaluation.entity';
import { Forum } from 'src/modules/forum/entities/forum.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CourseState } from './course-state.entity';

/**
 *
 */
@Entity()
export class Course extends CommonEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => CourseState, (state) => state.courses)
    @JoinColumn({ referencedColumnName: 'id', name: 'state' })
    state: CourseState;

    @OneToMany(() => Forum, (forum) => forum.course)
    forums: Forum[];

    @OneToMany(() => Evaluation, (evaluation) => evaluation.course)
    evaluations: Evaluation[];
}
