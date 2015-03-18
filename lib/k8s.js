var FormData     = require('form-data');

require('sugar');

var url = require('url');
var util = require('util');

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

    if (! info.token) {
        return new TypeError('token must be provided');
    }

    var request = require('./request')(info.protocol || 'https:', info.host, info.version, info.token);

    // ~~~~~ PUBLIC

    var Collections = require('./collections');
    var collections = new Collections(request);

    // ~ minions
    this.minions = collections.create('minions');

    // ~ pods
    this.pods = collections.create('pods');

    // ~ endpoints
    this.endpoints = collections.create('endpoints');

};
