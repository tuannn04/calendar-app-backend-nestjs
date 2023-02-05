import {Mutation, Resolver, Args} from "@nestjs/graphql";
import {TokenOutput} from "../output/token.output";
import {LoginInput} from "../input/login.input";
import {AccountService} from "../../account/service/account.service";
import {TokenService} from "../service/token.service";
import TokenConstant from "../constant/token.constant";

@Resolver(of => TokenOutput)
export class AccountResolver {
    constructor(
        private accountService: AccountService,
        private tokenService: TokenService
    ) {
    }

    @Mutation(returns => TokenOutput)
    async accountLogin(@Args('input') input: LoginInput) {
        const account = await this.accountService.login(input.username, input.password);
        return await this.tokenService.create(account['_id'], TokenConstant.USER_TYPE.ACCOUNT);
    }
}