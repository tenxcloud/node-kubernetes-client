var FormData     = require('form-data');

require('sugar');

var url          = require('url'),
    util         = require('util');

var VcapClient = module.exports = function (info) {
    /**
     * kubernetes client.
     *
     * Parameters
     *
     * - info: object containing the following
     *   - host (required): host of CF deployment
     *   - protocol: http: vs https:
     *   - one of either:
     *     - token (access token)
     *     - email,password (two separate fields)
     */

    // ~~~~~ PRIVATE
    var self = this;

    if (! info.host) {
        return new TypeError('host must be provided');
    }

    var request = require('./request')(info.protocol || 'https:', info.host, info.token);

    // ~~~~~ PUBLIC

    var Collections = require('./collections');
    var collections = new Collections(request);

    this.apps = collections.create('apps', {
        name: { type: 'string' },
        space_guid: { type: 'string' },
    }, [ 'routes', 'summary', 'download', 'service_bindings', 'stats', 'services', {
        method: 'instances',
        nested: [{
            method:     'logs',
            endpoint:   'files/logs'
        }],
        resultsMap:     function (results) {
            // the result from CF seems to be inconsistent. rather than an
            // array of instances, it's a map where keys are string index
            // numbers. We convert it here, recording the index to the `index`
            // field as a parsed int

            var asArray = [];

            Object.keys(results[0], function (key, value) {
                value.index = parseInt(key, 10);
                asArray[value.index] = value;
            });

            return asArray;
        }
    }]);

    this.services = collections.create('services', {
        label: { type: 'string' },
        url: { type: 'string' },
        provider: { type: 'string' },
        version: { type: 'string' },
        description: { type: 'string' },
    }, [ 'service_plans' ]);

    this.services.getByName = function (name, callback) {
        this.getBy(function (each) {
            return each.entity.label === name;
        }, callback);
    };

    this.users = collections.create('users', {
        guid: { type: 'string' },
    }, [ 'summary', 'managed_organizations', 'managed_spaces', 'spaces' ]);

    this.servicePlans = collections.create('service_plans', {
        name: { type: 'string' },
        free: { type: 'bool' },
        description: { type: 'string' },
    });

    this.serviceInstances = collections.create('service_instances', {
        name: { type: 'string' },
        space_guid: { type: 'string' },
        service_plan_guid: { type: 'string' },
    });

    this.orgs = this.organizations = collections.create('organizations', {
        name: { type: 'string' }
    }, [ 'users', 'spaces', 'managers', 'billing_managers', 'auditors' ]);

    this.spaces =     collections.create('spaces', {
        name: { type: 'string' },
        organization_guid: { type: 'string' }
    }, [ 'service_instances', 'managers', 'developers' ]);

    this.routes = collections.create('routes');
    this.service_bindings = collections.create('service_bindings');
    this.domains = collections.create('domains');
    this.runtimes = collections.create('runtimes');
    this.frameworks = collections.create('frameworks');
    // @HUANG QI GONG
    // Can't handle format /v2/events?q=type:audit.app.create
    // Dazyun need recreate this method
    this.events = collections.create('events');
    this.quota_definitions = collections.create('quota_definitions');
    this.endpoints = collections.create('endpoints');

    // ~ applications

    this.apps.upload = function (guid, zipFile, callback) {
        var fileStream = typeof zipFile === 'string' ?
            require('fs').createReadStream(zipFile) :
            zipFile;

        var form = new FormData();
        form.append('application', fileStream,
                { contentType: 'application/zip' });

        form.append('resources', '[]');

        form.getLength(function (err, length) {
            if (err) {
                return callback(err);
            }

            var req = request({
                endpoint: [ 'apps', guid, 'bits' ].join('/'),
                method: 'PUT'
            }, callback);

            req.setHeader('Content-Length', length);
            req._form = form;
        });
    };

    this.apps.retrieveFile = function (guid, instance_index, file_path, callback) {
        var req = request({
            endpoint: [ 'apps', guid, 'instances', instance_index, 'files', file_path ].join('/'),
            method: 'GET'
        }, callback);
    };

    this.apps.restart = function (id, callback) {
        var self = this;
        this.stop(id, function (err) {
            if (err) {
                return callback(err);
            }

            self.start(id, callback);
        });
    };

    this.apps.stop = function (id, callback) {
        self.apps.update(id, { state: 'STOPPED' }, callback);
    };

    this.apps.start = function (id, callback) {
        self.apps.update(id, { state: 'STARTED' }, callback);
    };
};
