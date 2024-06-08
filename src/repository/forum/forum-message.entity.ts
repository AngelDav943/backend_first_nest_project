import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ForumMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    forum: number;
    @Column()
    user: number;

    @CreateDateColumn()
    createddate: number;
    @CreateDateColumn()
    updateddate: number;
}