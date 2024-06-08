import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    url: string;
    @Column()
    extension: string;
    @Column()
    size: number;

    @CreateDateColumn()
    createddate: number;
    @CreateDateColumn()
    updateddate: number;
}