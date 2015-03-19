# Google Kubernetes client

Supports interaction with Kubernetes.

Install:

    npm install node-kubernetes-client

Current endpoint support includes:

* events
* endpoints
* namespaces
* pods
* minions

Interaction is accomplished via `client.<endpoint>.<method>`. (see examples below)

# Usage

## Create client

Authentication can be done via either token or login. If, however, the token
expires, the login info will be used to acquire a new token.

```js
var Client = require('node-kubernetes-client');

var client = new Client({
    host:  'xx.xx.xx.xx',
    protocol: 'https:',
    version: 'v1beta2',
    token: 'XYZ'
});
```

## Getting from pods

Paging is accomplished automatically. For example, a request for `pods` will
return all pods, not just those returned on the first page.

For example, to get all pods:

```js
client.pods.get(function (err, pods) {
    console.log('pods:', pods);
});
```

# How to run the test cases
## install mocha
```js
  npm install mocha
```
## run testcase
```js
  mocha test-pods.js
```
The results will be output to test/results/ directory with formatted JSON.

# Roadmap

See issues.

# Support

http://www.tenxcloud.com - a Docker startup
