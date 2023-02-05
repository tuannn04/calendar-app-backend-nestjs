import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {AuthorizationContextService} from "../service/authorization-context.service";

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    constructor(private readonly authorizationContext: AuthorizationContextService) {
    }

    async use(request: Request, response: Response, next: NextFunction) {
        await this.authorizationContext.registerAuthorizationKeys(request);
        next();
    }
}
