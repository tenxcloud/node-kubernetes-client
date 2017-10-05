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
    protocol: 'https',
    version: 'v1beta2',
    token: 'XYZ'
});
```

### Optional params:
Some optional params also exist on initialising the client. 
```js
{
    namespace:  'someNamespace', // filter all client requests by a namespace - default is no namespace
    timeout: 20000 // A timeout (in ms) for requests to k8 apis
    reqOptions: {} // array of options used to override the npm request module for this client proxy, auth, etc.
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
var schema = null, //optional param
innerCollections = null, // optional param
options = { apiPrefix : 'api2' }; // optionally set a per-collection api prefix
client.routes = client.createCollection('routes', schema, innerCollections, options);
// then use the routes collection like any other
```

## createCollection options

```
apiPrefix: "apis" // Sets the prefix to the api path for the new collection.
namespaced: true // Controls if paths include "/namespaces/${namespace}".
```

## Custom Collection for k8s deployments

```js
client = new Client({
  host:  'xx.xx.xx.xx',
  protocol: 'https',
  version: 'extensions/v1beta1',
  token: 'XYZ',
  namespace:  'mynamespace',
  reqOptions: {proxy: configLocation.proxy || null},
  timeout: 20000 
});
// add deployments to the api
client.deployments = client.createCollection('deployments', null, null, { apiPrefix : 'apis' });

var deploymentJSON = {
          "apiVersion": "extensions/v1beta1",
          "kind": "Deployment",
          ...
          }

// then use the deployments collection like any other
client.deployments.get(deploymentJSON.metadata.name, function (err, data) {
  if (err && err.statusCode != 404) {
    //something is wrong, bail
    console.log("error checking for deployment:", err);
    return;
  } else if (err && err.statusCode == 404) {
    //create if not found
    client.deployments.create(deploymentJSON, function (err, data) {
      if (err) {
        console.log("error updating deployment:", err);
        return;
      } else {
        console.log("deployment created:", deploymentJSON.metadata.name);
        return;
      }
    });
  } else {
    //update since it did not exist
    client.deployments.update(deploymentJSON.metadata.name, deploymentJSON, function (err, data) {
      if (err) {
        console.log("error updating deployment:", err);
        return;
      }
      console.log("deployment updated:", deploymentJSON.metadata.name);
      return;
    }); 
  }
});
```

# How to run the test cases
## install mocha
```js
  npm install mocha
```
## run testcase
```bash
  minikube start
  kubectl proxy
  mocha test/test-*
```
The results will be output to test/results/ directory with formatted JSON.

# Roadmap

See issues.

# Others

You may interested in kubernetes client library using other programming languanges, please check the below link
(https://github.com/GoogleCloudPlatform/kubernetes/blob/master/docs/client-libraries.md)
