import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 *
 */
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    /**
     * @returns Returns an empty object
     */
    @Get()
    getIndex() {
        return this.appService.getIndex();
    }
}
