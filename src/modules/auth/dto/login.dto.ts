import { PickType } from '@nestjs/mapped-types';
import { User } from 'src/modules/user/entities/user.entity';

export class LoginDto extends PickType(User, ['email', 'password']) {}

export class LoginResponseDto {
    user: User;
    token: string;
}

export class AuthTokenPayload {
    email: string;
    id: number;
}
