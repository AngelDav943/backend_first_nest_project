import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthTokenPayload } from '../dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

/**
 *
 */
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtRefreshStrategy.extractJWT,
                ExtractJwt,
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
        });
    }

    /**
     * Method to extract the token from the request cookie
     * @param req - Request
     * @returns - Token
     */
    private static extractJWT(req: Request): string | null {
        if (
            req.cookies &&
            'refresh' in req.cookies &&
            req.cookies.refresh.length > 0
        ) {
            return req.cookies.refresh;
        }
        return null;
    }

    /**
     * Validates the token
     * @param payload - Token payload
     * @returns - User data
     */
    async validate(payload: AuthTokenPayload) {
        return { userId: payload.id, username: payload.email };
    }
}
