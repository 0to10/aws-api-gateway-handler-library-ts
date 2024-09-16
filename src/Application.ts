'use strict';

import EventEmitter from 'events';
import http from 'http';

import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import {createServer, proxy} from 'aws-serverless-express';
import express, {Express} from 'express';

import 'express-async-errors';

import {CognitoRequestHandler} from './Middleware/AWS/CognitoRequestHandler';
import {Configuration} from './Configuration';
import {CORS} from './Middleware/CORS';
import {EventContextHandler} from './Middleware/AWS/EventContextHandler';
import {ExpressErrorHandler} from './Middleware/ExpressErrorHandler';
import {UnhandledRoute} from './Middleware/UnhandledRoute';
import {ResponseMapper} from './HTTP/ResponseMapper';


/**
 * Application
 *
 * @copyright Copyright (c) 2024 0TO10 B.V. <https://0to10.nl>
 * @license MIT
 */
export class Application {

    public readonly events: EventEmitter;
    public readonly express: Express;

    public readonly config: Configuration = {
        disable: ['x-powered-by'],
        cors: true,
    };

    constructor(
        config: Configuration = {},
    ) {
        this.config = {...this.config, ...config};

        this.events = new EventEmitter();
        this.express = express();

        if (false !== this.config.autoTransform) {
            this.express.set('json replacer', (_key: any, value: any): any => {
                if ('object' !== typeof value) {
                    return value;
                }

                if (value?.responseMapper instanceof ResponseMapper) {
                    return value.responseMapper.transform(value);
                }

                return value;
            });
        }

        this.initialize();
    }

    protected initialize(): void {
        (this.config.disable ?? []).forEach(disable => {
            this.express.disable(disable);
        });

        this.express.use(EventContextHandler.handle());
        this.express.use(CognitoRequestHandler.handle());

        if (this.config.cors) {
            this.express.use(CORS.handle());
        }
    }

    public listen(port: number): http.Server {
        this.express.use(UnhandledRoute.handle());
        this.express.use(ExpressErrorHandler.handle(this.events));

        return this.express.listen(port, (): void => {
            this.events.emit('listening', port);
        });
    }

    public async handler(
        event: APIGatewayProxyEvent,
        context: Context,
    ): Promise<APIGatewayProxyResult> {
        this.events.emit('event', event);

        return proxy(
            createServer(this.express),
            event,
            context,
            'PROMISE',
        ).promise;
    }

}
