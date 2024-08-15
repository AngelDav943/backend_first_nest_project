import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable, tap } from 'rxjs';

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
        const res = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
            tap(async ({ token }) => {
                res.cookie('token', token, {});
            }),
            map(({ user }) => {
                return user;
            }),
        );
    }
}
