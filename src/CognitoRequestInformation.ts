'use strict';

/**
 * CognitoRequestInformation
 *
 * @copyright Copyright (c) 2024 0TO10 B.V. <https://0to10.nl>
 * @license MIT
 */
export type CognitoRequestInformation = {
    identityId?: string;
    userPoolId?: string;
    subject?: string;

    /**
     * @deprecated
     */
    username?: string;
};
