import {Model, QueryWithHelpers} from 'mongoose';
import {SearchCriteriaDto} from "../../core/dto/search-criteria.dto";
import {SearchCriteriaTransformationService} from "./search-criteria-transformation.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class CollectionProcessorService {
    process(model: Model<any>, searchCriteria: SearchCriteriaDto): QueryWithHelpers<any, any, any, any> {
        const transformation = new SearchCriteriaTransformationService(searchCriteria);
        const transformed = transformation.build();
        return model.find(transformed.find).sort(transformed.sort).limit(transformed.limit).skip(transformed.skip);
    }
}