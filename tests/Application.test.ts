'use strict';

import http from 'http';

// @ts-ignore
import request, {Agent} from 'supertest';
import {describe, expect, test, afterAll} from '@jest/globals';

import {Application} from '../src';


describe('Application', (): void => {

    let server: http.Server;

    afterAll((): void => {
        server && server.close();
    });

    test('configuration is applied correctly', (): void => {
        const application: Application = new Application({
            disable: ['some-feature'],
            cors: false,
        });

        expect(application.config.disable).toStrictEqual(['some-feature']);
        expect(application.config.cors).toBeFalsy();
    });

    test('route errors are propagated', async (): Promise<void> => {
        const application: Application = new Application();

        application.express.get('/test', async (): Promise<void> => {
            throw new Error('Route error');
        });

        application.express.use((err: any, _req: any, res: any, _next: any) => {
            res.status(495);
            res.send(err.message);
            res.end();
        });

        server = application.listen(80);

        await request(server)
            .get('/test')
            .expect(495)
            .then(response => {
                expect(response.text).toEqual('Route error');
            })
        ;

        server.close();
    });

    test('middleware errors are propagated', async (): Promise<void> => {
        const application: Application = new Application();

        application.express.use(async (): Promise<void> => {
            throw new Error('Regular middleware error');
        });

        application.express.use((err: any, _req: any, res: any, _next: any) => {
            res.status(495);
            res.send(err.message);
            res.end();
        });

        server = application.listen(80);

        await request(server)
            .get('/test')
            .expect(495)
            .then(response => {
                expect(response.text).toEqual('Regular middleware error');
            })
        ;

        server.close();
    });

    test('OPTIONS /', async (): Promise<void> => {
        const application: Application = new Application();

        server = application.listen(80);

        await request(server)
            .options('/')
            .then(response => {
                expect(response.status).toStrictEqual(200);
                expect(response.text).toStrictEqual('');

                // Test CORS headers
                expect(response.header['access-control-allow-headers']).toStrictEqual('*');
                expect(response.header['access-control-allow-methods']).toStrictEqual('OPTIONS,HEAD,POST,GET,PUT,DELETE');
                expect(response.header['access-control-allow-origin']).toStrictEqual('*');
            })
        ;

        server.close();
    });

    test('OPTIONS with CORS disabled', async (): Promise<void> => {
        const application: Application = new Application({
            cors: false,
        });

        server = application.listen(80);

        await request(server)
            .options('/')
            .then(response => {
                expect(response.status).toStrictEqual(404);
                expect(response.text).toStrictEqual('Unable to handle the current request.');

                const headers: string[] = Object.keys(response.headers);

                expect(headers).not.toContainEqual('access-control-allow-headers');
                expect(headers).not.toContainEqual('access-control-allow-methods');
                expect(headers).not.toContainEqual('access-control-allow-origin');
            })
        ;

        server.close();
    });

});
