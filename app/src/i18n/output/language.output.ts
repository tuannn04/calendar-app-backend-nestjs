import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class LanguageOutput {
    @Field()
    code: string;

    @Field()
    label: string;
}