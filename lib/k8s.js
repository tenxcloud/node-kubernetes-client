var FormData = require('form-data')
  , url = require('url')
  , util = require('util');

require('sugar');

 /**
  * kubernetes client.
  *
  * Parameters
  * @protocol http or https
  * @host k8s API server host
  * @version k8s API server version
  * @token k8s API server token
  */

var VcapClient = module.exports = function (info) {

    // ~~~~~ PRIVATE
    var self = this;

    if (! info.host) {
        return new TypeError('host must be provided');
    }

    if (! info.version) {
        return new TypeError('version must be provided');
    }

    var request = require('./request')(info);

    // ~~~~~ PUBLIC

    var Collections = require('./collections');
    var collections = new Collections(request);

    // ~ minions
    this.minions = collections.create('minions');

    // ~ events
    this.events = collections.create('events');

    // ~ namespaces
    this.namespaces = collections.create('namespaces');

    // ~ pods
    this.pods = collections.create('pods', null, [{ method: 'log', nested: false }], null);

    // ~ services
    this.services = collections.create('services');

    // ~ replicationControllers
    this.replicationControllers = collections.create('replicationControllers');

    // ~ nodes
    this.nodes = collections.create('nodes');

    // ~ endpoints
    this.endpoints = collections.create('endpoints');

    // ~ proxy minions
    this.proxyMinions = collections.create('proxy/minions');

    // ~ proxy nodes
    this.proxyNodes = collections.create('proxy/nodes');

    // ~ proxy pods
    this.proxyPods = collections.create('proxy/pods');

    // ~ proxy services
    this.proxyServices = collections.create('proxy/services');

    // ~ watch pods
    this.watchPods = collections.create('watch/pods');

    // Allow users to create custom collections also
    this.createCollection = collections.create;
};
