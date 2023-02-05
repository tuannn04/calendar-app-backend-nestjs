import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from '@nestjs/config';
import DatabaseConstant from "../constant/database.constant";
import {Token, TokenSchema, CollectionName} from "../schemas/token.schema";

const databaseDeclaration = MongooseModule.forRootAsync(
    {
        imports: [ConfigModule],
        inject: [ConfigService],
        connectionName: DatabaseConstant.DB_CONNECTION_NAME,
        useFactory: async (configService: ConfigService) => {
            const host = configService.get('AUTHORIZATION_DB_HOST');
            const port = configService.get('AUTHORIZATION_DB_PORT');
            const dbName = configService.get('AUTHORIZATION_DB_DATABASE');
            const user = configService.get('AUTHORIZATION_DB_USERNAME');
            const pass = configService.get('AUTHORIZATION_DB_PASSWORD');
            const uri = `mongodb://${user}:${pass}@${host}:${port}/${dbName}`;
            return {uri, dbName};
        }
    }
);

const databaseDefinition = MongooseModule.forFeatureAsync([
    {
        name: Token.name,
        collection: CollectionName,
        useFactory: () => {
            return TokenSchema;
        },
    }
], DatabaseConstant.DB_CONNECTION_NAME);

export default [
    databaseDeclaration,
    databaseDefinition
]