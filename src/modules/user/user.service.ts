import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from 'src/repository/user/user-type.entity';
import { User } from 'src/repository/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserType)
        private userTypeRepository: Repository<UserType>,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    getAllUserTypes() {
        return this.userTypeRepository.find({ relations:['users'] });
    }

    getAllUsers() {
        return this.userRepository.find({ relations:['usertype'] });
    }
}
