import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

export const CollectionName = "token";

@Schema({
    validateBeforeSave: true,
    strict: false
})
export class Token {
    @Prop({required: true, alias: 'userId'})
    user_id: string;

    @Prop({required: true})
    user_type: string;

    @Prop({required: true, alias: 'accessToken'})
    access_token: string;

    @Prop({required: true, alias: 'refreshToken'})
    refresh_token: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);