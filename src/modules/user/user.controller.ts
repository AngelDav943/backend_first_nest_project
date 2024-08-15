import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

/**
 *
 */
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     * Creates a new user on the database
     * @param createUserDto All user data needed to create the new user
     * @returns Returns the user's id if successful
     */
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    /**
     * Gives all the users inside the database
     * @returns A list of all users
     */
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    /**
     * Returns the all the user types
     * @returns A list of user types
     */
    @Get('types')
    findAllTypes() {
        return this.userService.findAllTypes();
    }

    /**
     * Finds a specific user
     * @param id User's id to find
     * @returns Returns a user that matches the requested id
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        if (isNaN(+id) == false) {
            return this.userService.findOne({
                id: +id,
            });
        }
    }

    /**
     * Updates a user
     * @param id The user's id to edit
     * @param updateUserDto Data to update
     * @returns Returns true if successful
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    /**
     * Removes a user
     * @param id User to remove
     * @returns Returns true if successful
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
