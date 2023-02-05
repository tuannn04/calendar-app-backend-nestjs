import {Global, Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot(),
    ],
    controllers: [
    ],
    providers: [
    ]
})
export class SsoModule {
}