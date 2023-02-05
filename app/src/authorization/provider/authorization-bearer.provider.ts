import {AuthorizationContextService} from "../service/authorization-context.service";
import {AuthorizationBearerService} from "../service/authorization-bearer.service";

export const AuthorizationBearerProvider = {
    provide: "AUTHORIZATION_BEARER_PROVIDER",
    useFactory: (
        authorizationContextService: AuthorizationContextService,
        authorizationBearerService: AuthorizationBearerService
    ) => {
        authorizationContextService.addAuthorizationService(authorizationBearerService)
    },
    inject: [AuthorizationContextService, AuthorizationBearerService]
}