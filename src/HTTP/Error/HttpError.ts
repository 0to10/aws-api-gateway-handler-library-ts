'use strict';

/**
 * HttpError
 *
 * @copyright Copyright (c) 2024 0TO10 B.V. <https://0to10.nl>
 * @license MIT
 */
export class HttpError extends Error {

    constructor(
        public readonly status: number = 400,
        message?: string,
    ) {
        super(message);
    }

    public static badRequest(message?: string): HttpError {
        return new HttpError(400, message);
    }

    public static unauthorized(message?: string): HttpError {
        return new HttpError(401, message);
    }

    public static forbidden(message?: string): HttpError {
        return new HttpError(403, message);
    }

    public static notFound(message?: string): HttpError {
        return new HttpError(404, message);
    }

    public static failedDependency(message?: string): HttpError {
        return new HttpError(424, message);
    }

}