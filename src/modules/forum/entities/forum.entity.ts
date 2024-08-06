import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ForumMessage } from './forum-message.entity';
import { Course } from 'src/modules/course/entities/course.entity';
import { CommonEntity } from 'src/common/entity/common.entity';

/**
 *
 */
@Entity()
export class Forum extends CommonEntity {
    @Column()
    name: string;
    @Column()
    description: string;

    @ManyToOne(() => Course, (course) => course.forums)
    course: Course;

    @OneToMany(() => ForumMessage, (message) => message.forum)
    messages: ForumMessage;
}
