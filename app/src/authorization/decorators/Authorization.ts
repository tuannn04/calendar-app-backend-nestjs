import {applyDecorators, CanActivate, ExecutionContext, Injectable, SetMetadata, UseGuards} from "@nestjs/common";
import {Reflector} from '@nestjs/core';
import {AuthorizationContextService} from "../service/authorization-context.service";

export declare type AuthorizationOptions = {
    userTypes?: string[];
    roles?: string[];
}

@Injectable()
class AuthorizationGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private authorizationContextService: AuthorizationContextService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        return this.validateContext(context);
    }

    private async validateContext(context: ExecutionContext): Promise<boolean> {
        try {
            const validatedResults = await Promise.all([
                this.validateRoles(context),
                this.validateUsers(context)
            ]);
            return validatedResults.every(result => result === true);
        } catch (error) {
            return false;
        }
    }

    /**
     * @todo validate roles is in developing
     * @param context
     * @return Promise<boolean>
     * @private
     */
    private async validateRoles(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('authorization_roles', context.getHandler());
        if (!Array.isArray(roles) || !roles.length) {
            return true;
        }
        return true;
    }

    private async validateUsers(context: ExecutionContext): Promise<boolean> {
        const userTypes = this.reflector.get<string[]>('authorization_user_types', context.getHandler());
        if (!Array.isArray(userTypes) || !userTypes.length) {
            return true;
        }
        const userType = this.authorizationContextService.getUserType();
        return userTypes.includes(userType);
    }
}

export function Authorization(options?: AuthorizationOptions) {
    return applyDecorators(
        SetMetadata('authorization_roles', options?.roles || []),
        SetMetadata('authorization_user_types', options?.userTypes || []),
        UseGuards(AuthorizationGuard)
    )
}