import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants } from 'src/common/constants/jwt-secret';
import { AuthTokenPayload, AuthTokenPayloadValidate } from '../dto/login.dto';

/**
 *
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: JwtConstants.secret,
        });
    }

    /**
     * Function used to extract the token with the cookie inside the request
     * @param req - Request
     * @returns - Token
     */
    private static extractJWT(req: Request): string | null {
        if (
            req.cookies &&
            'token' in req.cookies &&
            req.cookies.token.length > 0
        ) {
            return req.cookies.token;
        }
        return null;
    }

    /**
     * Validates a token
     * @param payload - Token payload
     * @returns - User information
     */
    async validate(
        payload: AuthTokenPayload,
    ): Promise<AuthTokenPayloadValidate> {
        return {
            info: { id: payload.id, email: payload.email },
            expiration: new Date(payload.exp * 1000),
        };
    }
}
