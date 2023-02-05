import {Query, Mutation, Resolver, Args} from "@nestjs/graphql"
import {Reminder} from "../model/reminder.model";
import {ReminderService} from "../service/reminder.service";
import {ReminderInput} from "../input/reminder.input";
import {ReminderDto} from "../dto/reminder.dto";
import {SearchCriteriaDto} from "../../core/dto/search-criteria.dto";
import {Authorization} from "../../authorization/decorators/Authorization";
import TokenConstant from "../../authorization/constant/token.constant"
import {AuthorizationContextService} from "../../authorization/service/authorization-context.service";

@Resolver(of => Reminder)
export class ReminderResolver {
    constructor(
        private reminderService: ReminderService,
        private authorizationContextService: AuthorizationContextService
    ) {
    }

    @Query(returns => Reminder)
    @Authorization({userTypes: [TokenConstant.USER_TYPE.ACCOUNT, TokenConstant.USER_TYPE.ADMIN]})
    async reminder(@Args('id') id: string) {
        const reminder = await this.reminderService.findById(id);
        return new Reminder(reminder);
    }

    @Query(returns => [Reminder])
    @Authorization({userTypes: [TokenConstant.USER_TYPE.ACCOUNT, TokenConstant.USER_TYPE.ADMIN]})
    async searchReminder(@Args('searchCriteria', {nullable: true}) searchCriteria?: SearchCriteriaDto) {
        if (this.authorizationContextService.isAccount()) {
            const userId = this.authorizationContextService.getUserId();
            searchCriteria.filter_groups.push({filters: [{field: "account_id", value: userId}]})
        }
        return await this.reminderService.search(searchCriteria);
    }

    @Mutation(returns => Reminder)
    @Authorization({userTypes: [TokenConstant.USER_TYPE.ACCOUNT]})
    async createReminder(@Args('reminder') reminder: ReminderInput) {
        const reminderDto = new ReminderDto();
        Object.keys(reminder).forEach(field => reminderDto[field] = reminder[field]);
        if (this.authorizationContextService.isAccount()) {
            reminderDto.accountId = this.authorizationContextService.getUserId();
        }
        const document = await this.reminderService.create(reminderDto);
        return new Reminder(document);
    }
}