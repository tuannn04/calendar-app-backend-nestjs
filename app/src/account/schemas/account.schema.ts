import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

export const CollectionName = "account";

@Schema({
    validateBeforeSave: true,
    strict: false,
})
export class Account {
    @Prop({require: true, unique: true})
    email: string;

    @Prop({require: true})
    password: string;

    @Prop({required: false})
    firstname: string;

    @Prop({required: false})
    lastname: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);