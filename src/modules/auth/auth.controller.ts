import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

/**
 *
 */
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Logs in a user
     * @param loginDto Data needed for logging in
     * @returns If correctly logged in it will return the user's data with a token for authentication
     */
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    /**
     * Registers a new user
     * @param createUser Data needed to create a new user
     * @returns If successful it will return the user with a token for authentication
     */
    @Post('register')
    register(@Body() createUser: CreateUserDto) {
        return this.authService.register(createUser);
    }

    /**
     * Hashes a string
     * @param str string
     * @returns Hashed string
     */
    @Get('hash/:str')
    hashify(@Param('str') str: string) {
        return this.authService.hashify(str);
    }
}
