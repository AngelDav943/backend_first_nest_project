import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from './entities/user-type.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

/**
 *
 */
@Module({
    imports: [TypeOrmModule.forFeature([User, UserType])],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
