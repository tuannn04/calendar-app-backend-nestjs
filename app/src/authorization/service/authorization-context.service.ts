import {Injectable} from "@nestjs/common";
import {AuthorizationServiceInterface} from "./authorization-service.interface";
import {Request} from "express";
import TokenConstant from "../constant/token.constant";

@Injectable()
export class AuthorizationContextService {
    private userId: string | null;
    private userType: string | null;

    private authorizationServices: AuthorizationServiceInterface[];

    addAuthorizationService(service: AuthorizationServiceInterface) {
        if (!Array.isArray(this.authorizationServices)) {
            this.authorizationServices = [];
        }
        this.authorizationServices.push(service);
    }

    getAuthorizationServices(): AuthorizationServiceInterface[] {
        return (this.authorizationServices || []);
    }

    async registerAuthorizationKeys(request: Request) {
        await this.registerUserId(request);
        await this.registerUserType(request);
    }

    private async registerUserId(request: Request) {
        const services = this.getAuthorizationServices();
        const userIds = await Promise.all(services.map(service => service.getUserId(request)));
        this.userId = userIds.find(userId => userId !== null && userId !== undefined) || null;
    }

    private async registerUserType(request: Request) {
        const services = this.getAuthorizationServices();
        const userTypes = await Promise.all(services.map(service => service.getUserType(request)));
        this.userType = userTypes.find(userType => userType !== null && userType !== undefined) || null;
    }

    getUserId(): string | null {
        return this.userId;
    }

    getUserType(): string | null {
        return this.userType;
    }

    isAdmin() {
        return this.getUserType() === TokenConstant.USER_TYPE.ADMIN;
    }

    isAccount() {
        return this.getUserType() === TokenConstant.USER_TYPE.ACCOUNT;
    }
}