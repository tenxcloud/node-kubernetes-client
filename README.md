# Google Kubernetes client

Node.js client library for Google's Kubernetes API (https://github.com/GoogleCloudPlatform/kubernetes)
You can use this library to call a Kubernetes API hosted in a Kubernetes master node using Node.js.

Install:

    npm install node-kubernetes-client

Current endpoint support includes:

* events
* endpoints
* namespaces
* pods
* minions
* services
* replicationControllers
* nodes
* proxyMinions
* proxyNodes
* proxyPods
* proxyServices
* watchPods

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

### Optional params:
Some optional params also exist on initialising the client. 
```js
{
    namespace:  'someNamespace', // filter all client requests by a namespace - default is no namespace
    apiPrefix: 'someNamespace' // for APIs with a different API prefix to 'api'
}
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
## Retrieving from Custom Collections

Retrieving from custom k8 collections is enabled by using the `createCollection` functionality. 

For example, to create a custom collection called "routes":
```js
client.routes = client.createCollection('routes');
// then use the routes collection like any other
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

# Others

You may interested in kubernetes client library using other programming languanges, please check the below link
(https://github.com/GoogleCloudPlatform/kubernetes/blob/master/docs/client-libraries.md)
