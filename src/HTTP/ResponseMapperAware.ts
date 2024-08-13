'use strict';

import {ResponseMapper} from './ResponseMapper';

/**
 * ResponseMapperAware
 *
 * @copyright Copyright (c) 2024 0TO10 B.V. <https://0to10.nl>
 * @license MIT
 */
export interface ResponseMapperAware<T> {
    get responseMapper(): ResponseMapper<T>;
}
