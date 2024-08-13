'use strict';

import EventEmitter from 'node:events';

import {NextFunction, Request, Response, ErrorRequestHandler} from 'express';
import typeis from 'type-is';

import {HttpError} from '../HTTP/Error/HttpError';


/**
 * ExpressErrorHandler
 *
 * @copyright Copyright (c) 2024 0TO10 B.V. <https://0to10.nl>
 * @license MIT
 */
export class ExpressErrorHandler {

    public static handle(
        eventEmitter: EventEmitter,
    ): ErrorRequestHandler {
        const handler: ExpressErrorHandler = new ExpressErrorHandler();

        return (
            error: any,
            request: Request,
            response: Response,
            _next: NextFunction,
        ): void => {
            eventEmitter.emit('debug:error', error);

            const {status, message} = handler.getDataForError(error);

            if (
                typeis(request, ['json'])
                || request.headers.accept?.match(/application\/json/)
            ) {
                response.status(status).json({
                    status,
                    message,
                });

                return;
            }

            response.status(status).send(message);
        };
    }

    public getDataForError(error: any): { status: number; message: string; } {
        if (!(error instanceof HttpError)) {
            return {
                status: 400,
                message: 'An unknown error occurred while processing the request. Please try again later.',
            };
        }

        return {
            status: error.status,
            message: error.message,
        };
    }

}
