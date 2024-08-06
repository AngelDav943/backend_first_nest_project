import { Column, Entity, ManyToOne } from 'typeorm';
import { Forum } from './forum.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { CommonEntity } from 'src/common/entity/common.entity';

/**
 *
 */
@Entity()
export class ForumMessage extends CommonEntity {
    @Column()
    message: string;

    @ManyToOne(() => Forum, (forum) => forum.messages)
    forum: Forum;

    @ManyToOne(() => User)
    user: User;
}
