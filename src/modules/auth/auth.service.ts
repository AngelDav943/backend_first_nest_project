import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async login({ email, password }: LoginDto) {
        const user = await this.userService.findOne({
            email: email,
        });

        if (user?.password === password) {
            return user;
        }

        throw new UnauthorizedException();
    }
}
