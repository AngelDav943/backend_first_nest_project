import { CommonEntity } from 'src/common/entity/common.entity';
import { TaskStudent } from 'src/modules/task/entities/task-student.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

/**
 *
 */
@Entity({ name: 'file' })
export class FileEnt extends CommonEntity {
    @ManyToOne(() => TaskStudent, (taskStudent) => taskStudent.files)
    taskStudent: TaskStudent;

    @Column()
    name: string;
    @Column()
    url: string;
    @Column()
    extension: string;
    @Column()
    size: number;
}
