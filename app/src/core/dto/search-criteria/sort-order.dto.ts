import {Injectable} from "@nestjs/common";
import {Field, InputType} from "@nestjs/graphql";

export const ASC = 'ASC';
export const DESC = 'DESC';

@InputType()
@Injectable()
export class SortOrderDto {
    @Field()
    field: string;

    @Field()
    direction?: string = ASC;
}