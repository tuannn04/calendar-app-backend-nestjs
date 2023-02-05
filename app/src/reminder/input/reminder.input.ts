import {InputType, Field} from "@nestjs/graphql";
import {IsOptional, IsUrl} from "class-validator";
import IsISO8601Format from "../decorator/class-validation/IsISO8601Format";

@InputType()
export class ReminderInput {
    @Field()
    accountId: string;

    @Field()
    name: string;

    @Field()
    @IsISO8601Format()
    datetime: string;

    @Field({nullable: true})
    @IsUrl()
    @IsOptional()
    url?: string;
}