'use strict';

import {Application} from './Application';
import {Configuration} from './Configuration';
import {CognitoRequestInformation} from './CognitoRequestInformation';
import {HttpError} from './HTTP/Error/HttpError';
import {HttpStatusCode} from './HTTP/HttpStatusCode';

export {
    Application,
    Configuration,
    CognitoRequestInformation,
    HttpError,
    HttpStatusCode,
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        export interface Request {
            cognito: CognitoRequestInformation;
        }
    }
}
