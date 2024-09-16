'use strict';

/**
 * ResponseMapper
 *
 * @copyright Copyright (c) 2024 0TO10 B.V. <https://0to10.nl>
 * @license MIT
 */
export abstract class ResponseMapper<T> {
    abstract transform(input: T): object;
}
