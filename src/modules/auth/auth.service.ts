import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtConstants } from 'src/common/constants/jwt-secret';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import {
    AuthRefreshTokenPayload,
    AuthTokenPayloadValidateInfo,
    LoginResponseDto,
} from './dto/login.dto';
import { AuthRefreshToken } from './entities/authRefreshToken.entity';

/**
 *
 */
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @InjectRepository(AuthRefreshToken)
        private authRefreshTokenRepository: Repository<AuthRefreshToken>,
    ) {}

    /**
     * Logs in a user
     * @param user User to log in
     * @returns Returns user's data and a token for authentication if successfully logged on
     */
    async login(user: User): Promise<LoginResponseDto> {
        const token = await this.generateTokenPair(user);
        return { user, ...token };
    }

    /**
     * Registers a new user to the database
     * @param createUser Data needed to register the new user
     * @returns If successfull it will return the new user's data and a token for authentication
     */
    async register(createUser: CreateUserDto): Promise<number> {
        const decryptPassword = createUser.password;
        const hashPassword = await bcrypt.hash(decryptPassword, 10);
        createUser = { ...createUser, password: hashPassword };
        return this.userService.create(createUser);
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

    /** REFRESH TOKEN  */

    /**
     * Creates a new refresh token
     * @param userInfo - User information
     * @param currentRefreshToken - The current refresh token used
     * @param currentRefreshTokenExpiresAt - Fecha de expiración del token de refresco actual
     * @returns - Nuevo token de refresco
     */
    async generateRefreshToken(
        userInfo: AuthTokenPayloadValidateInfo,
        currentRefreshToken?: string,
        currentRefreshTokenExpiresAt?: Date,
    ): Promise<string> {
        const refreshPayload: AuthRefreshTokenPayload = {
            id: userInfo.id,
            email: userInfo.email,
        };
        const newRefreshToken = this.jwtService.sign(refreshPayload, {
            secret: JwtConstants.refresh,
            expiresIn: '30d',
        });

        if (currentRefreshToken && currentRefreshTokenExpiresAt) {
            if (
                await this.isRefreshTokenBlackListed(
                    currentRefreshToken,
                    userInfo.id,
                )
            ) {
                throw new UnauthorizedException('Invalid refresh token.');
            }

            await this.authRefreshTokenRepository.insert({
                token: currentRefreshToken,
                expiration: currentRefreshTokenExpiresAt,
                userId: userInfo.id,
            });
        }

        return newRefreshToken;
    }

    /**
     * Verifies if a refresh token is in the blacklist
     * @param token - Refresh token
     * @param userId - User's id
     * @returns - Result if the refresh token exists inside the blacklist
     */
    private isRefreshTokenBlackListed(token: string, userId: number) {
        return this.authRefreshTokenRepository.existsBy({ token, userId });
    }

    /**
     * Creates a token pair
     * @param userInfo - User data
     * @param currentRefreshToken - Token de refresco actual
     * @param currentRefreshTokenExpiresAt - Fecha de expiración del token de refresco actual
     * @returns - Par de tokens
     */
    async generateTokenPair(
        userInfo: AuthTokenPayloadValidateInfo,
        currentRefreshToken?: string,
        currentRefreshTokenExpiresAt?: Date,
    ): Promise<Omit<LoginResponseDto, 'user'>> {
        const payload = { email: userInfo.email, sub: userInfo.id };
        return {
            token: this.jwtService.sign(payload),
            refresh: await this.generateRefreshToken(
                userInfo,
                currentRefreshToken,
                currentRefreshTokenExpiresAt,
            ),
        };
    }

    /**
     *
     */
    /*@Cron(CronExpression.EVERY_DAY_AT_6AM)
  async clearExpiredRefreshTokens() {
    await this.authRefreshTokenRepository.delete({ expiresAt: LessThanOrEqual(new Date()) });
  }*/
}
