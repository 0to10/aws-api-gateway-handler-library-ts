'use strict';

import {APIGatewayEventIdentity} from 'aws-lambda';
import {NextFunction, Request, Response, RequestHandler} from 'express';


/**
 * CognitoRequestHandler
 *
 * @copyright Copyright (c) 2024 0TO10 B.V. <https://0to10.nl>
 * @license MIT
 */
export class CognitoRequestHandler {

    public static handle(): RequestHandler {
        return (
            request: Request,
            _response: Response,
            next: NextFunction,
        ): void => {
            request.cognito = {};

            const eventIdentity: APIGatewayEventIdentity | undefined = request.apiGateway?.event?.requestContext?.identity;

            if (!eventIdentity) {
                return next();
            }

            const {cognitoIdentityId, cognitoAuthenticationProvider} = eventIdentity;

            if (
                cognitoIdentityId
                && 'UNAUTH' !== cognitoIdentityId
            ) {
                request.cognito.identityId = cognitoIdentityId;
            }

            if (cognitoAuthenticationProvider) {
                const [, cognitoUserPoolId, cognitoSubject] = cognitoAuthenticationProvider
                    .match(/([\w-]+_[0-9a-zA-Z]+):CognitoSignIn:(.+)/) || []
                ;

                request.cognito.userPoolId = cognitoUserPoolId;
                request.cognito.subject = cognitoSubject;
                request.cognito.username = cognitoSubject;
            }

            next();
        };
    }

}
