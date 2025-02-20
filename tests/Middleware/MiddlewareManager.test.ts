'use strict';

// @ts-ignore
import request, {Agent} from 'supertest';
import {describe, jest, expect, test, beforeEach} from '@jest/globals';

import express, {Express} from 'express';

import {MiddlewareManager} from '../../src/Middleware/MiddlewareManager';


describe('MiddlewareManager', (): void => {

    const application: Express = express();

    const manager: MiddlewareManager = new MiddlewareManager(application);

    beforeEach((): void => {
        jest.clearAllMocks();

        jest.spyOn(application, 'use');
    });

    test('.json()', (): void => {
        manager.json();

        expect(application.use).toHaveBeenCalledTimes(1);
    });

    test('.raw()', (): void => {
        manager.raw();

        expect(application.use).toHaveBeenCalledTimes(1);
    });

    test('.text()', (): void => {
        manager.text();

        expect(application.use).toHaveBeenCalledTimes(1);
    });

    test('.urlencoded()', (): void => {
        manager.urlencoded();

        expect(application.use).toHaveBeenCalledTimes(1);
    });

});
