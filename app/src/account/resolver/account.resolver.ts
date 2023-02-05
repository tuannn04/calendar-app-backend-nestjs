import {Query, Mutation, Resolver, Args} from "@nestjs/graphql"
import {AccountOutput} from "../output/account.output";
import {AccountService} from "../service/account.service";
import {AccountInput} from "../input/account.input";
import {AuthorizationContextService} from "../../authorization/service/authorization-context.service";
import {Authorization} from "../../authorization/decorators/Authorization";
import TokenConstant from "../../authorization/constant/token.constant";

@Resolver(of => AccountOutput)
export class AccountResolver {
    constructor(
        private accountService: AccountService,
        private authorizationContextService: AuthorizationContextService,
    ) {
    }

    @Query(returns => AccountOutput)
    @Authorization({userTypes: [TokenConstant.USER_TYPE.ACCOUNT]})
    async myAccount() {
        const userId = this.authorizationContextService.getUserId();
        return await this.accountService.findById(userId);
    }

    @Query(returns => AccountOutput)
    @Authorization({userTypes: [TokenConstant.USER_TYPE.ADMIN]})
    async account(@Args('id') id: string) {
        return await this.accountService.findById(id);
    }

    @Mutation(returns => AccountOutput)
    async createAccount(@Args('account') accountInput: AccountInput) {
        return await this.accountService.create(accountInput);
    }
}