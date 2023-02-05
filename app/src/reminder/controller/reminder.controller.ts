import {Controller, Get, Post, Req, Query, Body, UsePipes, ValidationPipe} from "@nestjs/common";
import {Request} from 'express';
import {ReminderService} from "../service/reminder.service";
import {Reminder} from "../schemas/reminder.schema";
import {ReminderDto} from "../dto/reminder.dto";
import {SearchCriteriaDto} from "../../core/dto/search-criteria.dto";
import {Authorization} from "../../authorization/decorators/Authorization";
import TokenConstant from "../../authorization/constant/token.constant";

@Controller('v1/reminder')
export class ReminderController {
    constructor(private readonly reminderService: ReminderService) {
    }

    @Post('create')
    async create(@Body('reminder') reminder: ReminderDto): Promise<Reminder> {
        return await this.reminderService.create(reminder);
    }

    @Get('findById')
    @Authorization({userTypes: [TokenConstant.USER_TYPE.ACCOUNT]})
    async findById(@Req() request: Request): Promise<Reminder> {
        const {query} = request;
        const result = await this.reminderService.findById(query.id);
        return result;
    }

    @Get('search')
    @UsePipes(new ValidationPipe({whitelist: false, transform: true}))
    async search(@Query('searchCriteria') searchCriteria: SearchCriteriaDto | null): Promise<Reminder[]> {
        return await this.reminderService.search(searchCriteria);
    }
}