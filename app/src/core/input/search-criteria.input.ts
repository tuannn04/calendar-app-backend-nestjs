import {Injectable} from "@nestjs/common";
import {Field, InputType} from "@nestjs/graphql";

@InputType()
@Injectable()
export class SearchCriteriaInput {
    @Field({nullable: true})
    pageSize: number;

    @Field({nullable: true})
    page_size: number;

    @Field({nullable: true})
    currentPage: number;

    @Field({nullable: true})
    current_page: number;
}