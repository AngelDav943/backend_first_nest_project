import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from './entities/user-type.entity';
import { User } from './entities/user.entity';

/**
 *
 */
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserType)
        private userTypeRepository: Repository<UserType>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    /**
     * Creates a new user on the database
     * @param createUserDto All user data needed to create the new user
     * @returns Returns the user's id if successful
     */
    async create(createUserDto: CreateUserDto) {
        const createdUser = await this.userRepository.save(createUserDto);
        return createdUser.id;
    }

    /**
     * Gives all the users inside the database
     * @returns A list of all users
     */
    findAll() {
        return this.userRepository.find({
            relations: ['usertype'],
        });
    }

    /**
     * Returns the all the user types
     * @returns A list of user types
     */
    findAllTypes() {
        return this.userTypeRepository.find({
            relations: {
                users: true,
            },
        });
    }

    /**
     *  Finds a specific user with a certain criteria
     * @param where Criteria needed to find the user
     * @returns Returns a user if successfull
     */
    findOne(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
        return this.userRepository.findOne({
            relations: ['usertype'],
            where,
        });
    }

    /**
     * Updates an existing user in the database
     * @param id User to update
     * @param updateUserDto New data to update
     * @returns Returns true if successful
     */
    async update(id: number, updateUserDto: UpdateUserDto) {
        const response = await this.userRepository.update(id, updateUserDto);
        return response.affected > 0;
    }

    /**
     * Removes an existing user of the database
     * @param id User to remove
     * @returns Returns true if deleted successfully
     */
    async remove(id: number) {
        const response = await this.userRepository.delete(id);
        return response.affected > 0;
    }
}
