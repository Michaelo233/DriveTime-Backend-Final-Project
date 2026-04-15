export interface AuthorizationOptions {
    hasRole: Array<"admin" | "manager" | "salesperson">;
    allowSameUser?: boolean;
}