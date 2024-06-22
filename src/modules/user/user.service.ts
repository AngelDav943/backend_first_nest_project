import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './entities/user-type.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserType)
        private userTypeRepository: Repository<UserType>,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async create(createUserDto: CreateUserDto) {
        const createdUser = await this.userRepository.save(createUserDto)
        return createdUser.id;
    }

    findAll() {
        return this.userRepository.find({ relations:['usertype'] });
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const response = await this.userRepository.update(id, updateUserDto)
        return response.affected > 0
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
