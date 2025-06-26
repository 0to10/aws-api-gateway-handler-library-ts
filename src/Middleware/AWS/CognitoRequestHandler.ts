'use strict';

import {APIGatewayEventDefaultAuthorizerContext} from 'aws-lambda';
import {NextFunction, Request, Response, RequestHandler} from 'express';
import {APIGatewayEventRequestContextWithAuthorizer} from 'aws-lambda/common/api-gateway';

type RequestContext = APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>;


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

            const context: RequestContext | undefined = request.apiGateway?.event?.requestContext;

            if (context?.identity) {
                const {cognitoIdentityId, cognitoAuthenticationProvider} = context.identity;

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
            }

            const claims: Record<string, string> | undefined = context?.authorizer?.claims;

            if (claims) {
                const [, cognitoUserPoolId] = claims.iss.match(/\/([^/]+)$/) || [];

                request.cognito.userPoolId = cognitoUserPoolId;
                request.cognito.subject = claims.sub;
                request.cognito.username = claims.sub;
            }

            next();
        };
    }

}
