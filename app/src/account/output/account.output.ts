import {Injectable} from "@nestjs/common";
import {ObjectType, OmitType, PartialType, Field, InputType} from "@nestjs/graphql";
import {IsOptional} from "class-validator";

@Injectable()
@ObjectType()
export class AccountOutput {
    @IsOptional()
    @Field(type => String)
    _id?: string

    @Field(type => String, {nullable: true})
    @IsOptional()
    email?: string;

    @Field(type => String, {nullable: true})
    @IsOptional()
    firstname?: string;

    @Field(type => String, {nullable: true})
    @IsOptional()
    lastname?: string;
}