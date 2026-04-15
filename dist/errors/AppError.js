export class AppError extends Error {
    constructor(message, statusCode = 400, code = 'APP_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
    }
}
//# sourceMappingURL=AppError.js.map