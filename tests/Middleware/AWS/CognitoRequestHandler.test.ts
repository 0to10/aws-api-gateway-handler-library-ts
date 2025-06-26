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

    test.each([
        {
            event: require('./api-gateway-event.json'),
            expectedStatus: 200,
            expectedCognito: {
                identityId: 'us-east-1:3bc38b1e-c4c1-4aa3-9df5-9d7d83c1bc53',
                userPoolId: 'us-east-1_TestPool',
                subject: '1a072f08-5c61-4c89-807e-417d22702eb7',
                username: '1a072f08-5c61-4c89-807e-417d22702eb7',
            },
        },
        {
            event: require('./api-gateway-jwt-event.json'),
            expectedStatus: 200,
            expectedCognito: {
                userPoolId: 'us-east-1_PoolViaClaims',
                subject: '75d7e526-7cdd-4745-8d13-61872893f1db',
                username: '75d7e526-7cdd-4745-8d13-61872893f1db',
            },
        },
    ])('data is fetched from request', async ({
        event,
        expectedStatus,
        expectedCognito,
    }): Promise<void> => {
        process.env.AWS_REGION = 'AWS';

        const application: Application = new Application();

        application.express.get('/test', async (
            request: Request,
            response: Response,
        ): Promise<void> => {
            response.status(200).json({
                cognito: request.cognito,
            });
        });

        server = application.listen(80);

        const encodedEvent: string = encodeURIComponent(JSON.stringify(event));
        const encodedContext: string = encodeURIComponent(JSON.stringify({}));

        await request(server)
            .get('/test')
            .set('x-apigateway-event', encodedEvent)
            .set('x-apigateway-context', encodedContext)
            .then(response => {
                expect(response.status).toStrictEqual(expectedStatus);
                expect(response.body).toStrictEqual({
                    cognito: expectedCognito,
                });
            })
        ;

        server.close();
    });

});
