import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(() => Course, (course) => course.forums)
    course: number;

    @OneToMany(() => ForumMessage, (message) => message.forum)
    messages: ForumMessage;

    @CreateDateColumn()
    createddate: number;
    @CreateDateColumn()
    updateddate: number;
}