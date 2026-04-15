export declare function registerService(body: unknown): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}>;
export declare function loginService(body: unknown): Promise<{
    message: string;
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}>;
export declare function profileService(userId: number): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}>;
//# sourceMappingURL=authService.d.ts.map