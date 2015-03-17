# Google Kubernetes client

Supports interaction with Kubernetes.

Install:

    npm install node-kubernetes-client

Current endpoint support includes:

* endpoints

Interaction is accomplished via `client.<endpoint>.<method>`. (see examples below)

# Usage

## Create client

Authentication can be done via either token or login. If, however, the token
expires, the login info will be used to acquire a new token. Hence, long
running processes should consider the use of email/password.

```js
var Client = require('node-kubernetes-client');

var client = new Client({
    host:  'xx.xx.xx.xx',
    protocol: 'https:',
    token: 'XYZ'
});
```

## Getting from endpoints

Paging is accomplished automatically. For example, a request for `endpoints` will
return all endpoints, not just those returned on the first page.

For example, to get all endpoints:

```js
client.endpoints.get(function (err, endpoints) {
    console.log('endpoints:', endpoints);
});
```

# Roadmap

See issues.
