import {Module, Global} from '@nestjs/common';
import GraphQLConfigurationConfig from "./config/graphql-configuration.config";

@Global()
@Module({
    imports: [...GraphQLConfigurationConfig],
    controllers: [],
    providers: []
})
export class GraphQLModule {
}