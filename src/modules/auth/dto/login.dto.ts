import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/modules/user/entities/user.entity';

/**
 *
 */
export class LoginDto extends PickType(User, ['email', 'password']) {}

/**
 *
 */
export class LoginResponseDto {
    user: User;
    token: string;
    refresh: string;
}

/**
 *
 */
export class AuthTokenPayload {
    email: string;
    exp?: number;
    id: number;
}

/**
 *
 */
export class AuthTokenPayloadInfo {
    email: string;
    id: number;
}

/**
 *
 */
export class AuthTokenPayloadValidate {
    info: AuthTokenPayloadInfo;
    expiration?: Date;
}

/**
 *
 */
export class AuthRefreshTokenPayload extends AuthTokenPayload {
    expiration?: number;
}
