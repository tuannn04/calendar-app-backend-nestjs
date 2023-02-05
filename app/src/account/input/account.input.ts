import {InputType, Field} from "@nestjs/graphql";
import {IsOptional} from "class-validator";

@InputType()
export class AccountInput {
    @Field()
    email: string;

    @Field()
    password: string

    @Field()
    @IsOptional()
    firstname: string;

    @Field()
    @IsOptional()
    lastname: string;
}