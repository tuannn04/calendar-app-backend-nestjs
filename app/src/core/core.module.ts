import {Module, Global, NestModule, MiddlewareConsumer} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import {CryptingService} from "./service/crypting.service";

import {ControllerLoggerMiddleware} from "./middleware/controller-logger.middleware"

@Global()
@Module({
    imports: [
        ConfigModule.forRoot()
    ],
    controllers: [],
    providers: [
        CryptingService
    ],
    exports: [
        CryptingService
    ]
})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ControllerLoggerMiddleware).forRoutes('*');
    }
}