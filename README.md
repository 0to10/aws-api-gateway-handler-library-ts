# AWS API Gateway Handler

This repository provides a bootstrapper when creating Node.js Lambda functions, to
be used as API Gateway handlers.


## Getting started

Get started quickly by following the instructions below.


### Installation

Use [NPM](https://www.npmjs.com/) to install this library into your project:

```shell
npm install --save @0to10/aws-api-gateway-handler
```


### Setup

Quick setup:

```typescript
'use strict';

import http from 'http';

import {Application, Request, Response} from '@0to10/aws-api-gateway-handler';

const application: Application = new Application();

// Any application logic, such as registering routes, may be added after instantiation
application.express.get('/test', (
    _request: Request,
    response: Response,
): void => {
    response.status(200).json({
        message: 'Test was a success!',
    });
});

application.listen(80);

// Expose the handler
export const handler = application.handler.bind(application);
```


### Configuration

You may optionally pass in configuration options to the constructor of the `Application`
class, as follows:

```typescript
import {Application, Configuration} from '@0to10/aws-api-gateway-handler';

const config: Configuration = {
    disable: [
        'x-powered-by',
        'etag',
    ],
    cors: false,
};

const application: Application = new Application(config);
```

Below is an overview of the configuration options available.

| Option    | Type       | Default            |
|-----------|------------|--------------------|
| `disable` | `string[]` | `['x-powered-by']` |
| `cors`    | `boolean`  | `true`             |

A full list of available features that may be disabled (via the `disable` option) is available on the
[Express.js](https://expressjs.com/en/4x/api.html#app.settings.table) website.


### Events

Various events are emitted within this library, you may attach listeners to the events by following the
example below:

```typescript
// Application bootstrap omitted

application.events.on('listening', (port: number): void => {
    console.log('Listening on port ' + port);
});
```

Below is an overview of the available events.

| Event         | Arguments                       | Notes                                                |
|---------------|---------------------------------|------------------------------------------------------|
| `listening`   | `(port: number)`                | Emitted when the server is ready to process requests |
| `event`       | `(event: APIGatewayProxyEvent)` | Emitted every time a request is handled              |
| `debug:error` | `(error: any)`                  | Emitted whenever the error handler handles an error  |



### AWS Cognito

This library exposes a `cognito` object on the `Request` object of Express to make Cognito user
data easily accessible. See the type below.

```typescript
type CognitoRequestInformation = {
    identityId?: string;
    userPoolId?: string;
    username?: string;
}
```

Note that `request.cognito` will always be an object, but any of the values may be undefined.

```typescript
// Application bootstrap omitted

application.express.get('/test', (
    request: express.Request,
    _response: express.Response,
): void => {
    console.info('Cognito user:', {
        cognitoIdentityId: request.cognito.identityId,
        cognitoUserPoolId: request.cognito.userPoolId,
        cognitoUsername: request.cognito.username,
    });
});
```

