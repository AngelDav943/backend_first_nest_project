import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserType } from './repository/user/user-type.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}
