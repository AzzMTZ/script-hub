import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Welcome to ScriptHub! Go to /api to see the API documentation.';
    }
}
