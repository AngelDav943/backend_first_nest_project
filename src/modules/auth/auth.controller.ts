import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    Request,
    UnauthorizedException,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { Request as ExpressRequest } from 'express';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login.dto';

/**
 *
 */
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Logs in a user
     * @param request User's request
     * @returns If correctly logged in it will return the user's data with a token for authentication
     */
    @Post('login')
    @UseInterceptors(ClassSerializerInterceptor)
    @UseInterceptors(AuthInterceptor)
    @UseGuards(LocalAuthGuard)
    login(@Request() request) {
        return this.authService.login(request.user);
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

    /**
     * Refreshes the tokens
     * @param req - User's request
     * @returns - Refreshed tokens
     */
    @Post('refresh-token')
    refreshTokens(
        @Request() req: ExpressRequest,
    ): Promise<Omit<LoginResponseDto, 'user'>> {
        if (!req['user']) {
            throw new UnauthorizedException();
        }
        return this.authService.generateTokenPair(
            req.user['info'],
            req.cookies['refresh'],
            req.user['expiration'],
        );
    }
}
