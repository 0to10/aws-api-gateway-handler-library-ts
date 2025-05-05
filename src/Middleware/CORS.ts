'use strict';

import {NextFunction, Request, Response, RequestHandler} from 'express';


/**
 * CORS
 *
 * @copyright Copyright (c) 2024 0TO10 B.V. <https://0to10.nl>
 * @license MIT
 */
export class CORS {

    private static credentialHeaders: [
        'authorization',
        'cookie',
    ];

    public static handle(): RequestHandler {
        return (
            request: Request,
            response: Response,
            next: NextFunction,
        ): void => {
            response.header('Access-Control-Allow-Origin', request.header('origin') ?? '*');

            if ('OPTIONS' === request.method) {
                response.header('Access-Control-Allow-Headers', request.header('access-control-request-headers') ?? '*');
                response.header('Access-Control-Allow-Methods', 'OPTIONS,HEAD,POST,GET,PUT,DELETE');

                response.status(200).send('');

                return;
            }

            if (CORS.requestContainsHeader(request, CORS.credentialHeaders)) {
                response.header('Access-Control-Allow-Credentials', 'true');
            }

            next();
        };
    }

    private static requestContainsHeader(request: Request, headers: Array<string>): boolean {
        for (const header of headers) {
            if (undefined !== request.header(header)) {
                return true;
            }
        }

        return false;
    }

}