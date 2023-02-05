import {Module, Global} from '@nestjs/common';
import {LanguageResolver} from "./resolver/language.resolver";

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [
        LanguageResolver
    ]
})
export class I18nModule {
}