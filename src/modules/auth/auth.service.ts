import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthTokenPayload, LoginDto, LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login({ email, password }: LoginDto): Promise<LoginResponseDto> {
        const user = await this.userService.findOne({
            email: email,
        });

        const payload: AuthTokenPayload = {
            email: user.email,
            id: user.id,
        };
        const token = await this.jwtService.signAsync(payload);

        const isValid = await bcrypt.compare(password, user?.password);
        if (isValid) {
            return { user, token };
        }

        throw new UnauthorizedException();
    }

    async register(createUser: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUser.password, 11);
        createUser = {
            ...createUser,
            password: hashedPassword,
        };
        return this.userService.create(createUser);
    }

    async hashify(str: string) {
        return await bcrypt.hash(str, 10);
    }
}
