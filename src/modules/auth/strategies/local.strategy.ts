import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/modules/user/entities/user.entity';
import { AuthService } from '../auth.service';

/**
 *
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    /**
     * Validates a user
     * @param username - Nombre de usuario del usuario
     * @param password - Contraseña del usuario
     * @returns - Usuario
     */
    async validate(username: string, password: string): Promise<User> {
        const user = await this.authService.validateUser(username, password);
        if (!user) throw new UnauthorizedException();
        return user;
    }
}
