import {Injectable} from "@nestjs/common";
import {FilterGroupDto} from "./search-criteria/filter-group.dto";
import {SortOrderDto} from "./search-criteria/sort-order.dto";
import {Field, InputType} from "@nestjs/graphql";

@InputType()
@Injectable()
export class SearchCriteriaDto {
    @Field(type => [FilterGroupDto], {nullable: true})
    filter_groups: FilterGroupDto[];

    @Field(type => [FilterGroupDto], {nullable: true})
    filterGroups: FilterGroupDto[];

    @Field(type => [SortOrderDto], {nullable: true})
    sort_orders: SortOrderDto[];

    @Field(type => [SortOrderDto], {nullable: true})
    sortOrders: SortOrderDto[];

    @Field({nullable: true})
    pageSize: number;

    @Field({nullable: true})
    page_size: number;

    @Field({nullable: true})
    currentPage: number;

    @Field({nullable: true})
    current_page: number;
}