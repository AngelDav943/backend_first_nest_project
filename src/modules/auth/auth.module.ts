import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from 'src/common/constants/jwt-secret';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: JwtConstants.secret,
            signOptions: {
                expiresIn: '60m',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
