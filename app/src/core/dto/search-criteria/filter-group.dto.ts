import {Injectable} from "@nestjs/common";
import {FilterDto} from "./filter-group/filter.dto";
import {Field, InputType} from "@nestjs/graphql";

@InputType()
@Injectable()
export class FilterGroupDto {
    @Field(type => [FilterDto])
    filters: FilterDto[]
}