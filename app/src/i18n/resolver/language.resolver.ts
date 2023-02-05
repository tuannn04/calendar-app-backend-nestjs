import {Resolver, Query} from "@nestjs/graphql";
import {LanguageOutput} from "../output/language.output";
import * as ALL_LANGUAGES from "../lib/language.json";

@Resolver(of => LanguageOutput)
export class LanguageResolver {

    @Query(returns => [LanguageOutput])
    async languages() {
        return ALL_LANGUAGES
    }
}