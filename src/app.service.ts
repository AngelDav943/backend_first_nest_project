import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './modules/user/entities/user.entity';
import { UserType } from './modules/user/entities/user-type.entity';

@Injectable()
export class AppService {

  constructor(
  ) {}

  getHello(): string {
    return 'hola mundo';
  }
}
