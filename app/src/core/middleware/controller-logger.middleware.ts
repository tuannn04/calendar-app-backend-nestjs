import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';

@Injectable()
export class ControllerLoggerMiddleware implements NestMiddleware {
    use(request: Request, response: Response, next: NextFunction) {
        const {query, body} = request;
        console.log('query');
        console.log(query);
        console.log('body');
        console.log(body);
        next();
    }
}
