import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 *
 */
@Entity()
export class AuthRefreshToken extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    expiration: Date;

    @Column()
    userId: number;
}
