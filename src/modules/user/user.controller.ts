import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService) {}

    @Get('types')
    getUserTypes() {
        return this.userService.getAllUserTypes();
    }

    @Get('getall')
    getUsers() {
        return this.userService.getAllUsers();
    }
}
