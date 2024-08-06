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
     *
     * @param loginDto
     */
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    /**
     *
     * @param createUser
     */
    @Post('register')
    register(@Body() createUser: CreateUserDto) {
        return this.authService.register(createUser);
    }

    /**
     *
     * @param str
     */
    @Get('hash/:str')
    hashify(@Param('str') str: string) {
        return this.authService.hashify(str);
    }
}
