import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from '@nestjs/config';
import DatabaseConstant from "../constant/database.constant";
import {Account, AccountSchema, CollectionName} from "../schemas/account.schema";

const databaseDeclaration = MongooseModule.forRootAsync(
    {
        imports: [ConfigModule],
        inject: [ConfigService],
        connectionName: DatabaseConstant.DB_CONNECTION_NAME,
        useFactory: async (configService: ConfigService) => {
            const host = configService.get('ACCOUNT_DB_HOST');
            const port = configService.get('ACCOUNT_DB_PORT');
            const dbName = configService.get('ACCOUNT_DB_DATABASE');
            const user = configService.get('ACCOUNT_DB_USERNAME');
            const pass = configService.get('ACCOUNT_DB_PASSWORD');
            const uri = `mongodb://${user}:${pass}@${host}:${port}/${dbName}`;
            return {uri, dbName};
        }
    }
);

const databaseDefinition = MongooseModule.forFeatureAsync([
    {
        name: Account.name,
        collection: CollectionName,
        useFactory: () => {
            return AccountSchema;
        },
    }
], DatabaseConstant.DB_CONNECTION_NAME);

export default [
    databaseDeclaration,
    databaseDefinition
]