import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from '@nestjs/config';
import DatabaseConstant from "../constant/database.constant";
import {Reminder, ReminderSchema} from "../schemas/reminder.schema";

const databaseDeclaration = MongooseModule.forRootAsync(
    {
        imports: [ConfigModule],
        inject: [ConfigService],
        connectionName: DatabaseConstant.DB_CONNECTION_NAME,
        useFactory: async (configService: ConfigService) => {
            const host = configService.get('REMINDER_DB_HOST');
            const port = configService.get('REMINDER_DB_PORT');
            const dbName = configService.get('REMINDER_DB_DATABASE');
            const user = configService.get('REMINDER_DB_USERNAME');
            const pass = configService.get('REMINDER_DB_PASSWORD');
            const uri = `mongodb://${user}:${pass}@${host}:${port}/${dbName}`;
            return {uri, dbName};
        }
    }
);

const databaseDefinition = MongooseModule.forFeatureAsync([
    {
        name: Reminder.name,
        collection: 'reminder',
        useFactory: () => {
            return ReminderSchema;
        },
    }
], DatabaseConstant.DB_CONNECTION_NAME);

export default [
    databaseDeclaration,
    databaseDefinition
]