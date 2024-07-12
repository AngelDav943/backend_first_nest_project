import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ForumMessage } from "./forum-message.entity";
import { Course } from "src/modules/course/entities/course.entity";

@Entity()
export class Forum {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    description: string;

    @ManyToOne(() => Course, (course) => course.forums)
    course: Course;

    @OneToMany(() => ForumMessage, (message) => message.forum)
    messages: ForumMessage;

    @CreateDateColumn()
    createddate: Date;

    @UpdateDateColumn()
    updateddate: Date;
}