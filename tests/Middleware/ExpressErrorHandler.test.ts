'use strict';

import http from 'http';

// @ts-ignore
import request, {Agent} from 'supertest';
import {describe, expect, test, afterAll} from '@jest/globals';

import {Application, HttpError} from '../../src';


describe('ExpressErrorHandler', (): void => {

    let server: http.Server;

    afterAll((): void => {
        server && server.close();
    });

    test('handle HttpError', async (): Promise<void> => {
        const application: Application = new Application();

        application.express.get('/test', async (): Promise<void> => {
            throw new HttpError(418, 'Testing if HttpError is caught properly');
        });

        server = application.listen(80);

        await request(server)
            .get('/test')
            .then(response => {
                expect(response.status).toStrictEqual(418);
                expect(response.text).toStrictEqual('Testing if HttpError is caught properly');
            })
        ;

        server.close();
    });

    test('handle HttpError with JSON', async (): Promise<void> => {
        const application: Application = new Application();

        application.express.post('/test', async (): Promise<void> => {
            throw new HttpError(418, 'Testing if HttpError is caught properly');
        });

        server = application.listen(80);

        await request(server)
            .post('/test')
            .send({
                test: 'something'
            })
            .set('Content-Type', 'application/json')
            .then(response => {
                expect(response.status).toStrictEqual(418);
                expect(response.body).toStrictEqual({
                    status: 418,
                    message: 'Testing if HttpError is caught properly',
                });
            })
        ;

        server.close();
    });

    test('handle HttpError with accept JSON', async (): Promise<void> => {
        const application: Application = new Application();

        application.express.get('/test', async (): Promise<void> => {
            throw new HttpError(418, 'Testing if HttpError is caught properly');
        });

        server = application.listen(80);

        await request(server)
            .get('/test')
            .set('Accept', 'application/json')
            .then(response => {
                expect(response.status).toStrictEqual(418);
                expect(response.body).toStrictEqual({
                    status: 418,
                    message: 'Testing if HttpError is caught properly',
                });
            })
        ;

        server.close();
    });

    test('handle unknown Error', async (): Promise<void> => {
        const application: Application = new Application();

        application.express.get('/error', async (): Promise<void> => {
            throw new Error('Testing with unknown error');
        });

        server = application.listen(80);

        await request(server)
            .get('/error')
            .then(response => {
                expect(response.status).toStrictEqual(400);
                expect(response.text).toStrictEqual('An unknown error occurred while processing the request. Please try again later.');
            })
        ;

        server.close();
    });

});
