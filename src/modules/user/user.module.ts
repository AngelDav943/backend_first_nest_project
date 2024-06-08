import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from 'src/repository/user/user-type.entity';
import { User } from 'src/repository/user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserType, User])
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
