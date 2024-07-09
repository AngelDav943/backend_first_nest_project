import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Forum } from "./forum.entity";
import { User } from "src/modules/user/entities/user.entity";

@Entity()
export class ForumMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @ManyToOne(() => Forum, (forum) => forum.messages)
    forum: Forum;

    @ManyToOne(() => User)
    user: User;

    @CreateDateColumn()
    createddate: Date;
    @UpdateDateColumn()
    updateddate: Date;
}