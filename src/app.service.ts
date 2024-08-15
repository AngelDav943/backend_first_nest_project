import { Injectable } from '@nestjs/common';

/**
 *
 */
@Injectable()
export class AppService {
    constructor() {}

    /**
     * @returns Returns an empty object
     */
    getIndex() {
        return {};
    }
}
