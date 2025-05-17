import { HttpException, HttpStatus } from "@nestjs/common";

export abstract class AbstractController {

    constructor() {}

    async handleException(error: Error): Promise<void> { 
        throw new HttpException(error.message, 
            HttpStatus.INTERNAL_SERVER_ERROR
        );            
    }
}