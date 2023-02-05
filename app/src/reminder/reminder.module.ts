import {Module, Global} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import DatabaseConfiguration from "./config/database-configuration.config";
import {ReminderController} from "./controller/reminder.controller";
import {ReminderService} from "./service/reminder.service";
import {ReminderResolver} from "./resolver/reminder.resolver";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot(),
        ...DatabaseConfiguration,
    ],
    controllers: [
        ReminderController
    ],
    providers: [
        ReminderService,
        ReminderResolver
    ]
})
export class ReminderModule {
}