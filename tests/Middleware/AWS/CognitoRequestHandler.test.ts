'use strict';

import http from 'http';
import process from 'process';

import {Request, Response} from 'express';

// @ts-ignore
import request, {Agent} from 'supertest';
import {describe, expect, test, afterAll} from '@jest/globals';

import {Application} from '../../../src';


describe('CognitoRequestHandler', (): void => {

    let server: http.Server;

    afterAll((): void => {
        server && server.close();

        process.env.AWS_REGION = undefined;
    });

    test('data is fetched from request', async (): Promise<void> => {
        process.env.AWS_REGION = 'AWS';

        const application: Application = new Application();

        application.express.get('/test', async (
            request: Request,
            response: Response,
        ): Promise<void> => {
            response.status(200).json({
                // @ts-ignore
                cognito: request.cognito,
            });
        });

        server = application.listen(80);

        const event: object = require('./api-gateway-event.json');

        const encodedEvent: string = encodeURIComponent(JSON.stringify(event));
        const encodedContext: string = encodeURIComponent(JSON.stringify({}));

        await request(server)
            .get('/test')
            .set('x-apigateway-event', encodedEvent)
            .set('x-apigateway-context', encodedContext)
            .then(response => {
                expect(response.status).toStrictEqual(200);
                expect(response.body).toStrictEqual({
                    cognito: {
                        identityId: 'us-east-1:00000000-0000-0000-0000-000000000000',
                        userPoolId: 'us-east-1_TestPool',
                        username: '1a072f08-5c61-4c89-807e-417d22702eb7',
                    },
                });
            })
        ;

        server.close();
    });

});
