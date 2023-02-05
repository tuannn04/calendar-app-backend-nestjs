import {Request} from "express";

export interface AuthorizationServiceInterface {
    /**
     * @param request Current Request
     * @returns string userId, otherwise null
     */
    getUserId(request: Request): Promise<string | null>;

    /**
     * @param request Current Request
     * @returns string userType, otherwise null
     */
    getUserType(request: Request): string | Promise<string> | null | Promise<null>;
}