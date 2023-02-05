import {Global, MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {CoreModule} from "../core/core.module";
import {AccountModule} from "../account/account.module";
import DatabaseConfiguration from "./config/database-configuration.config";
import {ConfigService} from "./service/config.service";
import {TokenService} from "./service/token.service";
import {AccountResolver} from "./resolver/account.resolver";
import {AuthorizationMiddleware} from "./middleware/authorization.middleware";
import {AuthorizationContextService} from "./service/authorization-context.service";
import {AuthorizationBearerService} from "./service/authorization-bearer.service";
import {AuthorizationBearerProvider} from "./provider/authorization-bearer.provider";
import {HttpModule} from "@nestjs/axios";

@Global()
@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot(),
        CoreModule,
        AccountModule,
        ...DatabaseConfiguration
    ],
    controllers: [
    ],
    providers: [
        ConfigService,
        TokenService,
        AccountResolver,
        AuthorizationContextService,
        AuthorizationBearerService,
        AuthorizationBearerProvider
    ],
    exports: [
        TokenService,
        AuthorizationContextService
    ]
})
export class AuthorizationModule  implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthorizationMiddleware).forRoutes('*');
    }
}