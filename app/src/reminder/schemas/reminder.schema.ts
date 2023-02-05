import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';
import {IsOptional} from "class-validator";

export type ReminderDocument = HydratedDocument<Reminder>;

@Schema({
    validateBeforeSave: true,
    strict: false
})
export class Reminder {
    @Prop({required: true, alias: 'accountId'})
    account_id: string;

    @Prop({require: true})
    name: string;

    @Prop({
        type: mongoose.Schema.Types.Date,
        required: true
    })
    datetime: mongoose.Schema.Types.Date;

    @Prop()
    url: string;
}

export const ReminderSchema = SchemaFactory.createForClass(Reminder);