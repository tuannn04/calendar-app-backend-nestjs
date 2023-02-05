import {Injectable} from '@nestjs/common';
import mongoose, {Model} from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
import {Reminder, ReminderDocument} from "../schemas/reminder.schema";
import {ReminderDto} from "../dto/reminder.dto";
import DatabaseConstant from "../constant/database.constant";
import {SearchCriteriaDto} from "../../core/dto/search-criteria.dto";
import {CollectionProcessorService} from "../../mongodb/service/collection-processor.service";

@Injectable()
export class ReminderService {
    constructor(
        @InjectModel(Reminder.name, DatabaseConstant.DB_CONNECTION_NAME) private reminderModel: Model<ReminderDocument>
    ) {
    }

    async create(createReminderDto: ReminderDto): Promise<Reminder> {
        const createdReminder = new this.reminderModel(createReminderDto);
        return await createdReminder.save();
    }

    async findById(id: number | any): Promise<Reminder> {
        const filter = {_id: isNaN(id) ? new mongoose.Types.ObjectId(id) : +id};
        const searchHandler = this.reminderModel.findOne(filter);
        try {
            return await searchHandler.exec();
        } catch (error) {
            throw error;
        }
    }

    async search(searchCriteria: SearchCriteriaDto | null): Promise<Reminder[]> {
        const processor = new CollectionProcessorService();
        const query = processor.process(this.reminderModel, searchCriteria);
        return await query.exec();
    }
}
