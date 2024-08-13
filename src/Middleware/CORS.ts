'use strict';

import {NextFunction, Request, Response, RequestHandler} from 'express';


/**
 * CORS
 *
 * @copyright Copyright (c) 2024 0TO10 B.V. <https://0to10.nl>
 * @license MIT
 */
export class CORS {

    public static handle(): RequestHandler {
        return (
            request: Request,
            response: Response,
            next: NextFunction,
        ): void => {
            response.header('Access-Control-Allow-Headers', '*');
            response.header('Access-Control-Allow-Methods', 'OPTIONS,HEAD,POST,GET,PUT,DELETE');
            response.header('Access-Control-Allow-Origin', '*');

            if ('OPTIONS' === request.method) {
                response.status(200).send('');
                return;
            }

            next();
        };
    }

}