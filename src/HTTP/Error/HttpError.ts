'use strict';

import {HttpStatusCode} from '../HttpStatusCode';

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
        return new HttpError(HttpStatusCode.BAD_REQUEST, message);
    }

    public static unauthorized(message?: string): HttpError {
        return new HttpError(HttpStatusCode.UNAUTHORIZED, message);
    }

    public static forbidden(message?: string): HttpError {
        return new HttpError(HttpStatusCode.FORBIDDEN, message);
    }

    public static notFound(message?: string): HttpError {
        return new HttpError(HttpStatusCode.NOT_FOUND, message);
    }

    public static methodNotAllowed(message?: string): HttpError {
        return new HttpError(HttpStatusCode.METHOD_NOT_ALLOWED, message);
    }

    public static notAcceptable(message?: string): HttpError {
        return new HttpError(HttpStatusCode.NOT_ACCEPTABLE, message);
    }

    public static proxyAuthenticationRequired(message?: string): HttpError {
        return new HttpError(HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED, message);
    }

    public static requestTimeout(message?: string): HttpError {
        return new HttpError(HttpStatusCode.REQUEST_TIMEOUT, message);
    }

    public static conflict(message?: string): HttpError {
        return new HttpError(HttpStatusCode.CONFLICT, message);
    }

    public static gone(message?: string): HttpError {
        return new HttpError(HttpStatusCode.GONE, message);
    }

    public static lengthRequired(message?: string): HttpError {
        return new HttpError(HttpStatusCode.LENGTH_REQUIRED, message);
    }

    public static preconditionFailed(message?: string): HttpError {
        return new HttpError(HttpStatusCode.PRECONDITION_FAILED, message);
    }

    public static payloadTooLarge(message?: string): HttpError {
        return new HttpError(HttpStatusCode.PAYLOAD_TOO_LARGE, message);
    }

    public static uriTooLong(message?: string): HttpError {
        return new HttpError(HttpStatusCode.URI_TOO_LONG, message);
    }

    public static unsupportedMediaType(message?: string): HttpError {
        return new HttpError(HttpStatusCode.UNSUPPORTED_MEDIA_TYPE, message);
    }

    public static rangeNotSatisfiable(message?: string): HttpError {
        return new HttpError(HttpStatusCode.RANGE_NOT_SATISFIABLE, message);
    }

    public static expectationFailed(message?: string): HttpError {
        return new HttpError(HttpStatusCode.EXPECTATION_FAILED, message);
    }

    public static imATeapot(message?: string): HttpError {
        return new HttpError(HttpStatusCode.IM_A_TEAPOT, message);
    }

    public static misdirectedRequest(message?: string): HttpError {
        return new HttpError(HttpStatusCode.MISDIRECTED_REQUEST, message);
    }

    public static upgradeRequired(message?: string): HttpError {
        return new HttpError(HttpStatusCode.UPGRADE_REQUIRED, message);
    }

    public static preconditionRequired(message?: string): HttpError {
        return new HttpError(HttpStatusCode.PRECONDITION_REQUIRED, message);
    }

    public static tooManyRequests(message?: string): HttpError {
        return new HttpError(HttpStatusCode.TOO_MANY_REQUESTS, message);
    }

    public static requestHeaderFieldsTooLarge(message?: string): HttpError {
        return new HttpError(HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE, message);
    }

    public static unavailableForLegalReasons(message?: string): HttpError {
        return new HttpError(HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS, message);
    }

    // Experimental
    public static paymentRequired(message?: string): HttpError {
        return new HttpError(HttpStatusCode.PAYMENT_REQUIRED, message);
    }

    // Experimental
    public static tooEarly(message?: string): HttpError {
        return new HttpError(HttpStatusCode.TOO_EARLY, message);
    }

    // WebDAV
    public static unprocessableContent(message?: string): HttpError {
        return new HttpError(HttpStatusCode.UNPROCESSABLE_CONTENT, message);
    }

    // WebDAV
    public static locked(message?: string): HttpError {
        return new HttpError(HttpStatusCode.LOCKED, message);
    }

    // WebDAV
    public static failedDependency(message?: string): HttpError {
        return new HttpError(HttpStatusCode.FAILED_DEPENDENCY, message);
    }

}