import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtConstants } from 'src/common/constants/jwt-secret';

/**
 *
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    /*
     * Extracts the token from the request's header
     * @param {Request} request - Request
     * @returns {string} - Token
     */
    /**
     *
     * @param request
     */
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type == 'Bearer' ? token : undefined;
    }

    /**
     *
     * @param context
     */
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        try {
            const payload = this.jwtService.verify(token, {
                secret: JwtConstants.secret,
            });

            request['payload'] = payload;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}
