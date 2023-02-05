import {Injectable} from "@nestjs/common";

@Injectable()
export class ConfigService {
    isMultipleLoginSession(): boolean {
        return false;
        const config = process.env.CONFIG_MULTIPLE_LOGIN_SESSION;
        return config === '1' || config === 'true';
    }

    getAuthorizationServiceUrl(): string {
        return process.env.AUTHORIZATION_SERVICE_URL;
    }

    getTokenUrl(accessToken: string): string {
        return this.getAuthorizationServiceUrl() + '/token/' + accessToken;
    }
}