import {Injectable} from '@nestjs/common';
import {createHmac} from "crypto";

@Injectable()
export class CryptingService {
    encrypt(value: string): string {
        const key = process.env.ENSCRYPT_KEY;
        return createHmac('sha256', key).update(value).digest().toString("base64")
    }
}