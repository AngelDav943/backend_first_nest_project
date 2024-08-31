import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

/**
 *
 */
@Injectable()
export class AuthInterceptor implements NestInterceptor {
    /**
     * Auth interceptor
     * @param context an `ExecutionContext` object providing methods to access the
     * route handler and class about to be invoked.
     * @param next a reference to the `CallHandler`, which provides access to an
     * `Observable` representing the response stream from the route handler.
     * @returns Returns the header with a token cookie
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(({ user, token, refresh }) => {
                const response = context.switchToHttp().getResponse();
                if (token) {
                    response.cookie('token', token, {});
                    response.cookie('refresh', refresh, {});
                }
                return user;
            }),
        );
    }
}
