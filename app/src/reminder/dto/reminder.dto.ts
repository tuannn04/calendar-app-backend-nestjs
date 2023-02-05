import mongoose from "mongoose";
import {IsNotEmpty, IsUrl, IsOptional} from 'class-validator';
import {Expose} from "class-transformer";

export class ReminderDto {
    @Expose()
    @IsNotEmpty()
    accountId: string;

    @Expose()
    @IsNotEmpty()
    name: string;

    @Expose()
    @IsNotEmpty()
    datetime: mongoose.Schema.Types.Date;

    @Expose()
    @IsUrl()
    @IsOptional()
    url?: string;
}