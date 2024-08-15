'use strict';

import {Application} from './Application';
import {Configuration} from './Configuration';
import {CognitoRequestInformation} from './CognitoRequestInformation';
import {HttpError} from './HTTP/Error/HttpError';
import {HttpStatusCode} from './HTTP/HttpStatusCode';
import {ResponseMapper} from './HTTP/ResponseMapper';
import {ResponseMapperAware} from './HTTP/ResponseMapperAware';

import {NextFunction, Request, RequestHandler, Response} from 'express';

export {
    Application,
    Configuration,
    CognitoRequestInformation,
    HttpError,
    HttpStatusCode,
    ResponseMapper,
    ResponseMapperAware,

    // Express
    NextFunction,
    Request,
    RequestHandler,
    Response,
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        export interface Request {
            cognito: CognitoRequestInformation;
        }
    }
}
