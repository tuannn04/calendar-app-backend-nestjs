import {Injectable} from "@nestjs/common";
import mongoose, {Model} from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
import {Account, AccountDocument} from "../schemas/account.schema";
import DatabaseConstant from "../constant/database.constant";
import {AccountInput} from "../input/account.input";
import {CryptingService} from "../../core/service/crypting.service";
import {SearchCriteriaDto} from "../../core/dto/search-criteria.dto";
import {CollectionProcessorService} from "../../mongodb/service/collection-processor.service";

@Injectable()
export class AccountService {
    constructor(
        @InjectModel(Account.name, DatabaseConstant.DB_CONNECTION_NAME) private accountModel: Model<AccountDocument>,
        private readonly cryptingService: CryptingService,
    ) {
    }

    async create(accountInput: AccountInput): Promise<Account> {
        accountInput.password = this.cryptingService.encrypt(accountInput.password);
        const account = new this.accountModel(accountInput);
        const result = await account.save();
        return result;
    }

    async findById(id: string): Promise<Account> {
        const handler = this.accountModel.findById(new mongoose.Types.ObjectId(id));
        return await handler.exec();
    }

    async login(email: string, password: string): Promise<Account> {
        password = this.cryptingService.encrypt(password);
        const handler = this.accountModel.find({email: email, password: password});
        const result = await handler.exec();
        return result[0];
    }

    async search(searchCriteria: SearchCriteriaDto | null): Promise<Account[]> {
        const processor = new CollectionProcessorService();
        const query = processor.process(this.accountModel, searchCriteria);
        return await query.exec();
    }
}