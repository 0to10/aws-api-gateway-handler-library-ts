'use strict';

import {CognitoRequestInformation} from '../CognitoRequestInformation';

export {};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        export interface Request {
            cognito: CognitoRequestInformation;
        }
    }
}
