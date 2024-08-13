'use strict';

import process from 'process';

import {eventContext} from 'aws-serverless-express/middleware';
import {NextFunction, Request, Response, RequestHandler} from 'express';


/**
 * EventContextHandler
 *
 * @copyright Copyright (c) 2024 0TO10 B.V. <https://0to10.nl>
 * @license MIT
 */
export class EventContextHandler {

    public static handle(): RequestHandler {
        if (undefined === process.env.AWS_REGION) {
            return (
                _request: Request,
                _response: Response,
                next: NextFunction,
            ): void => {
                next();
            };
        }

        return eventContext();
    }

}
