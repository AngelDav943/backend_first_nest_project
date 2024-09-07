import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConstants } from 'src/common/constants/jwt-secret';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRefreshToken } from './entities/authRefreshToken.entity';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

/**
 *
 */
@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([AuthRefreshToken]),
        JwtModule.register({
            global: true,
            secret: JwtConstants.secret,
            signOptions: {
                expiresIn: '5m',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
