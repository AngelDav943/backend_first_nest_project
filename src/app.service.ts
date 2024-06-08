import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './repository/user/user.entity';
import { UserType } from './repository/user/user-type.entity';

@Injectable()
export class AppService {

  constructor(
  ) {}

  getHello(): string {
    return 'hola mundo';
  }
}
