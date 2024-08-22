import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthTokenPayload, LoginDto, LoginResponseDto } from './dto/login.dto';

/**
 *
 */
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    /**
     * Logs in a user
     * @param root0 Login data
     * @param root0.email Email of the existing user
     * @param root0.password Password needed to log in
     * @returns Returns user's data and a token for authentication if successfully logged on
     */
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

    /**
     * Registers a new user to the database
     * @param createUser Data needed to register the new user
     * @returns If successfull it will return the new user's data and a token for authentication
     */
    async register(createUser: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUser.password, 11);
        createUser = {
            ...createUser,
            password: hashedPassword,
        };

        return this.userService.create(createUser).then(() =>
            this.login({
                email: createUser.email,
                password: createUser.password,
            }),
        );
    }
    /**
     * Validates a user
     * @param email - User's email
     * @param password - Password to validate
     * @returns - User's data
     */
    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }

    /**
     * Hashes a string
     * @param str String to hash
     * @returns Hashed string
     */
    async hashify(str: string) {
        return await bcrypt.hash(str, 10);
    }
}
