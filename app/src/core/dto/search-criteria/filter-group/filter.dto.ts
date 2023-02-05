import {Injectable} from "@nestjs/common";
import {Field, InputType} from "@nestjs/graphql";

@InputType()
@Injectable()
export class FilterDto {
    @Field()
    field: string;

    @Field(type => String)
    value: string | any;

    @Field()
    condition_type?: string;
}