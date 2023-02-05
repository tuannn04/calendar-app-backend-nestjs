import {Injectable} from "@nestjs/common";
import {AuthorizationServiceInterface} from "./authorization-service.interface";
import {Request} from 'express';
import {TokenService} from "./token.service";

@Injectable()
export class AuthorizationBearerService implements AuthorizationServiceInterface {
    private userId: string | null;
    private userType: string | null;

    constructor(private tokenService: TokenService) {
    }

    async getUserId(request: Request): Promise<string | null> {
        const token = await this.getBearerToken(request);
        if (!token) {
            this.userId = null;
            return null;
        }
        const tokenObject = await this.tokenService.getByAccessToken(token);
        this.userId = (tokenObject && tokenObject.user_id) || null;
        this.userType = (tokenObject && tokenObject.user_type) || null;
        return this.userId;
    }

    async getUserType(request: Request): Promise<string | null> {
        return this.userType;
    }

    async getBearerToken(request: Request) {
        const {headers} = request || {};
        const {authorization} = headers || {};
        const authorizationElements = (authorization || "").toString().split(" ");
        if (!authorizationElements.length || authorizationElements[0].toString().toLowerCase() !== 'bearer') {
            return null;
        }
        const token = authorizationElements[authorizationElements.length - 1];
        return token || null;
    }
}