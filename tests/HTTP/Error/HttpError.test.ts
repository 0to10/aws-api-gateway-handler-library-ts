'use strict';

import {describe, expect, test} from '@jest/globals';

import {HttpError} from '../../../src';


describe('HttpError', (): void => {

    test('new HttpError()', (): void => {
        const error: HttpError = new HttpError(123, 'The message');

        expect(error).toBeInstanceOf(Error);

        expect(error.status).toStrictEqual(123);
        expect(error.message).toStrictEqual('The message');
    });

    test('HttpError.badRequest()', (): void => {
        const error: HttpError = HttpError.badRequest('Bad Request !!');

        expect(error).toBeInstanceOf(HttpError);

        expect(error.status).toStrictEqual(400);
        expect(error.message).toStrictEqual('Bad Request !!');
    });

    test('HttpError.unauthorized()', (): void => {
        const error: HttpError = HttpError.unauthorized('Unauthorized message');

        expect(error).toBeInstanceOf(HttpError);

        expect(error.status).toStrictEqual(401);
        expect(error.message).toStrictEqual('Unauthorized message');
    });

    test('HttpError.forbidden()', (): void => {
        const error: HttpError = HttpError.forbidden('You shall not pass!');

        expect(error).toBeInstanceOf(HttpError);

        expect(error.status).toStrictEqual(403);
        expect(error.message).toStrictEqual('You shall not pass!');
    });

    test('HttpError.notFound()', (): void => {
        const error: HttpError = HttpError.notFound('Page/route not found');

        expect(error).toBeInstanceOf(HttpError);

        expect(error.status).toStrictEqual(404);
        expect(error.message).toStrictEqual('Page/route not found');
    });

    test('HttpError.failedDependency()', (): void => {
        const error: HttpError = HttpError.failedDependency('Something else needs to happen first');

        expect(error).toBeInstanceOf(HttpError);

        expect(error.status).toStrictEqual(424);
        expect(error.message).toStrictEqual('Something else needs to happen first');
    });

});