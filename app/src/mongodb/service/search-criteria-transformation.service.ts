import {SearchCriteriaDto} from "../../core/dto/search-criteria.dto";
import {Injectable} from "@nestjs/common";
import {FilterGroupDto} from "../../core/dto/search-criteria/filter-group.dto";
import {FilterDto} from "../../core/dto/search-criteria/filter-group/filter.dto";
import {ASC} from "../../core/dto/search-criteria/sort-order.dto";

@Injectable()
export class SearchCriteriaTransformationService {
    private transformedSearchCriteria = {
        find: {},
        sort: {},
        limit: 0,
        skip: 0
    };

    constructor(private readonly searchCriteria: SearchCriteriaDto) {
    }

    build() {
        this.transformFilterGroups();
        this.transformSortOrders();
        this.transformPagination();
        return this.transformedSearchCriteria;
    }

    transformFilterGroups() {
        const filterGroups = [
            ...(this.searchCriteria.filterGroups || []),
            ...(this.searchCriteria.filter_groups || []),
        ];
        if (filterGroups.length > 0) {
            const transformedFilterGroups = filterGroups.map(filterGroup => this.transformFilterGroup(filterGroup));
            this.transformedSearchCriteria.find = transformedFilterGroups.length > 1 ?
                {$and: transformedFilterGroups} :
                transformedFilterGroups[0];
        }
    }

    transformFilterGroup(filterGroup: FilterGroupDto) {
        const filters = filterGroup.filters || [];
        const transformedFilters = filters.map(filter => this.transformFilter(filter));
        return transformedFilters.length > 1 ? {$or: transformedFilters} : transformedFilters[0];
    }

    transformFilter(filter: FilterDto) {
        let {field, value, condition_type} = filter;
        if (condition_type === 'like') {
            return {[field]: `/${value}/`};
        }
        if (condition_type === 'in') {
            value = value.split(',');
        }
        return {
            [field]: {
                ['$' + (condition_type ?? 'eq')]: value
            }
        }
    }

    transformSortOrders() {
        const result = {};
        const sortOrders = [
            ...(this.searchCriteria.sort_orders || []),
            ...(this.searchCriteria.sortOrders || [])
        ];
        sortOrders.forEach(order => {
            result[order.field] = order.direction === ASC ? 1 : -1;
        });
        this.transformedSearchCriteria.sort = result;
    }

    transformPagination() {
        const limit = this.searchCriteria.page_size ||
            this.searchCriteria.pageSize || this.transformedSearchCriteria.limit;
        const currentPage = this.searchCriteria.current_page || this.searchCriteria.currentPage || 0;
        const skip = Math.max(currentPage - 1, 0) * limit;
        this.transformedSearchCriteria.limit = limit;
        this.transformedSearchCriteria.skip = skip;
    }
}