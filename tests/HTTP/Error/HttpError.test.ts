'use strict';

import {randomUUID} from 'node:crypto';

import {describe, expect, test} from '@jest/globals';

import {HttpError} from '../../../src';
import {HttpStatusCode} from '../../../src';


describe('HttpError', (): void => {

    test('new HttpError()', (): void => {
        const error: HttpError = new HttpError(123, 'The message');

        expect(error).toBeInstanceOf(Error);

        expect(error.status).toStrictEqual(123);
        expect(error.message).toStrictEqual('The message');
    });

    test.each([
        {
            method: 'badRequest',
            status: HttpStatusCode.BAD_REQUEST,
        },
        {
            method: 'unauthorized',
            status: HttpStatusCode.UNAUTHORIZED,
        },
        {
            method: 'forbidden',
            status: HttpStatusCode.FORBIDDEN,
        },
        {
            method: 'notFound',
            status: HttpStatusCode.NOT_FOUND,
        },
        {
            method: 'methodNotAllowed',
            status: HttpStatusCode.METHOD_NOT_ALLOWED,
        },
        {
            method: 'notAcceptable',
            status: HttpStatusCode.NOT_ACCEPTABLE,
        },
        {
            method: 'proxyAuthenticationRequired',
            status: HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED,
        },
        {
            method: 'requestTimeout',
            status: HttpStatusCode.REQUEST_TIMEOUT,
        },
        {
            method: 'conflict',
            status: HttpStatusCode.CONFLICT,
        },
        {
            method: 'gone',
            status: HttpStatusCode.GONE,
        },
        {
            method: 'lengthRequired',
            status: HttpStatusCode.LENGTH_REQUIRED,
        },
        {
            method: 'preconditionFailed',
            status: HttpStatusCode.PRECONDITION_FAILED,
        },
        {
            method: 'payloadTooLarge',
            status: HttpStatusCode.PAYLOAD_TOO_LARGE,
        },
        {
            method: 'uriTooLong',
            status: HttpStatusCode.URI_TOO_LONG,
        },
        {
            method: 'unsupportedMediaType',
            status: HttpStatusCode.UNSUPPORTED_MEDIA_TYPE,
        },
        {
            method: 'rangeNotSatisfiable',
            status: HttpStatusCode.RANGE_NOT_SATISFIABLE,
        },
        {
            method: 'expectationFailed',
            status: HttpStatusCode.EXPECTATION_FAILED,
        },
        {
            method: 'imATeapot',
            status: HttpStatusCode.IM_A_TEAPOT,
        },
        {
            method: 'misdirectedRequest',
            status: HttpStatusCode.MISDIRECTED_REQUEST,
        },
        {
            method: 'upgradeRequired',
            status: HttpStatusCode.UPGRADE_REQUIRED,
        },
        {
            method: 'preconditionRequired',
            status: HttpStatusCode.PRECONDITION_REQUIRED,
        },
        {
            method: 'tooManyRequests',
            status: HttpStatusCode.TOO_MANY_REQUESTS,
        },
        {
            method: 'requestHeaderFieldsTooLarge',
            status: HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE,
        },
        {
            method: 'unavailableForLegalReasons',
            status: HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS,
        },
        {
            method: 'paymentRequired',
            status: HttpStatusCode.PAYMENT_REQUIRED,
        },
        {
            method: 'tooEarly',
            status: HttpStatusCode.TOO_EARLY,
        },
        {
            method: 'unprocessableContent',
            status: HttpStatusCode.UNPROCESSABLE_CONTENT,
        },
        {
            method: 'locked',
            status: HttpStatusCode.LOCKED,
        },
        {
            method: 'failedDependency',
            status: HttpStatusCode.FAILED_DEPENDENCY,
        },
    ])('HttpError.$1()', ({method, status}): void => {
        const randomMessage: string = randomUUID();

        // @ts-ignore
        const error: HttpError = HttpError[method](randomMessage);

        expect(error).toBeInstanceOf(HttpError);

        expect(error.status).toStrictEqual(status);
        expect(error.message).toStrictEqual(randomMessage);
    });

});