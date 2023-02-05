import {Global, Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import DatabaseConfiguration from "./config/database-configuration.config";
import {CoreModule} from "../core/core.module";
import {AccountResolver} from "./resolver/account.resolver";
import {AccountService} from "./service/account.service";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot(),
        CoreModule,
        ...DatabaseConfiguration
    ],
    controllers: [],
    providers: [
        AccountResolver,
        AccountService
    ],
    exports: [
        AccountService
    ]
})
export class AccountModule {
}