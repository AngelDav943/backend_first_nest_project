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

    /**
     * Extracts the token from the request's header
     * @param request - Request
     * @returns - Token
     */
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type == 'Bearer' ? token : undefined;
    }

    /**
     * Checks whether or not the current request is allowed to proceed
     * @param context Provides details about the current request
     * @returns A value indicating whether or not the current request can proceed
     */
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        // const token = this.extractTokenFromHeader(request);
        const token = request.cookies['token'];

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
