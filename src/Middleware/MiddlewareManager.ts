'use strict';

import {Options, OptionsJson, OptionsText, OptionsUrlencoded} from 'body-parser';
import {Express, json, raw, text, urlencoded} from 'express';


/**
 * MiddlewareManager
 *
 * @copyright Copyright (c) 2025 0TO10 B.V. <https://0to10.nl>
 * @license MIT
 */
export class MiddlewareManager {

    constructor(
        private readonly express: Express,
    ) {
    }

    public json(options?: OptionsJson): void {
        this.express.use(json(options));
    }

    public raw(options?: Options): void {
        this.express.use(raw(options));
    }

    public text(options?: OptionsText): void {
        this.express.use(text(options));
    }

    public urlencoded(options?: OptionsUrlencoded): void {
        const defaults: OptionsUrlencoded = {
            extended: true,
        };

        this.express.use(urlencoded({...defaults, ...options}));
    }

}
