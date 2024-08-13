'use strict';

import {RequestHandler} from 'express';

import {HttpError} from '../HTTP/Error/HttpError';


/**
 * UnhandledRoute
 *
 * @copyright Copyright (c) 2024 0TO10 B.V. <https://0to10.nl>
 * @license MIT
 */
export class UnhandledRoute {

    public static handle(): RequestHandler {
        return (): void => {
            throw HttpError.notFound('Unable to handle the current request.');
        };
    }

}
