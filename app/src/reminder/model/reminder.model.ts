import {Field, GraphQLISODateTime, ObjectType} from '@nestjs/graphql';
import {Reminder as ReminderMongo} from "../schemas/reminder.schema";

@ObjectType()
export class Reminder {
    constructor(reminder?: ReminderMongo) {
        if (reminder && reminder['_doc']) {
            Object.keys(reminder['_doc'] ?? {}).forEach(key => this[key] = reminder[key]);
        }
    }

    @Field(type => String, {nullable: true})
    _id?: string;

    @Field(type => String, {nullable: true})
    account_id: string

    @Field(type => String, {nullable: true})
    name: string

    @Field(type => GraphQLISODateTime, {nullable: true})
    datetime: string

    @Field(type => String, {nullable: true})
    url?: string
}