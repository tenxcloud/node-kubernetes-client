var errors = require('./errors');
var createSchema = require('json-gate').createSchema;
var async = require('async');
var util = require('util');

require('sugar');

var factory = module.exports = function (request) {
    var getPath = function () {
        return [].slice.call(arguments).filter(function (each) {
            return each !== null && typeof each !== 'undefined';
        }).join('/');
    };

    var InnerCollection = function (parentCollection, id, collection) {
        this.get = function (callback) {
            request({
                endpoint: getPath(parentCollection, id, collection),
                method: 'GET'
            }, function (err, result) {
                callback(err, result && (result.resources || result));
            });
        };

        this.post = function (innerId, callback) {
            request({
                endpoint: getPath(parentCollection, id, collection, innerId),
                method: 'POST',
            }, function (err, result) {
                callback(err, result && (result.resources || result));
            });
        };

        this.put = function (innerId, callback) {
            request({
                endpoint: getPath(parentCollection, id, collection, innerId),
                method: 'PUT',
            }, function (err, result) {
                callback(err, result && (result.resources || result));
            });
        };

        this.delete = function (innerId, callback) {
            request({
                endpoint: getPath(parentCollection, id, collection, innerId),
                method: 'DELETE',
            }, function (err, result) {
                callback(err, result && (result.resources || result));
            });
        };
    };

    var Collection = function (collection, schema, innerCollections, options) {
        /**
         * Collection manages interaction with RESTful collection on
         * cloudfoundry, such as orgs, apps, services, spaces, etc
         */

        var makeObject = function (id) {
            var obj = {};

            if (typeof id === 'object') {
                Object.merge(obj, id);
                if (id.metadata) {
                    id = id.metadata.guid;
                } else if (typeof id.index !== 'undefined') {
                    id = id.index;
                }
            }

            (innerCollections || []).each(function (each) {
                var method,
                    innerCollectionName,
                    options = {},
                    isNestedCollection = false;

                if (typeof each === 'object') {
                    method = each.method;
                    innerCollectionName = each.endpoint || method;
                    isNestedCollection = !! each.nested;
                    if (each.resultsMap) {
                        options.resultsMap = each.resultsMap;
                    }
                } else {
                    method = each.camelize(false);
                    innerCollectionName = each;
                }

                if (isNestedCollection) {
                    obj[method] =
                        new Collection(util.format('%s/%s/%s', collection, id,
                            innerCollectionName),
                            {},
                            each.nested, options);
                } else {
                    obj[method] = new InnerCollection(collection, id, innerCollectionName);
                }
            });

            return obj;
        };

        if (schema) {
            Object.values(schema, function (value) {
                value.required = true;
            });
            schema = {
                properties: schema
            };

            schema = schema && createSchema(schema);
        }

        this.get = function (query, callback) {
            if (! callback && typeof query !== 'function') {
                /**
                 * Client is using shortcut on the get. I.e. they
                 * are using a form like:
                 *
                 *   collection.get(id).subCollection(...);
                 */

                return makeObject(query);
            }

            var multiResults = false;

            if (typeof query === 'function') {
                callback = query;
                query = null;
                multiResults = true;
            } else if (typeof query === 'object') {
                multiResults = true;
            }

            var finished = false,
                results  = [];

            var requestObject = {
                endpoint: getPath(collection, query),
                page:     multiResults ? 1 : null, // don't page if we're
                                                   // looking up one item
                method:   'GET',
            };

            if (query && typeof query === 'object') {
                requestObject.endpoint = getPath(collection);

                var qs = [];
                Object.keys(query, function (key, value) {
                    qs.push(key + ':' + value);
                });

                requestObject.qs = { q: qs.join(';') };
            }

            async.until(function () {
                return finished;
            }, function (callback) {
                request(requestObject, function (err, result) {
                    if (err) {
                        return callback(err);
                    }

                    finished = ! result.next_url;
                    requestObject.page += 1;

                    results.add(result.resources || result);

                    callback();
                });
            }, function (err) {
                if (err) {
                    return callback(err);
                }

                if (options && options.resultsMap) {
                    results = options.resultsMap(results);
                }

                results = results.map(makeObject);

                if (! multiResults) {
                    results = results[0];
                }

                callback(null, results);
            });
        };

        this.getBy = function (query, callback) {
            this.get(function (err, result) {

                if (err) {
                    return callback(err);
                }

                var match = result.find(query);

                callback(match ? null : new errors.NotFoundError(query), match);
            });
        };

        this.getByName = function (name, callback) {
            this.get({ name: name }, callback);
        };

        this.create = function (body, callback) {
            if (schema) {
                try {
                    schema.validate(body);
                } catch (err) {
                    return callback(err);
                }
            }

            request({
                endpoint: getPath(collection),
                method: 'POST',
                json: body
            }, callback);
        };

        this.update = function (id, body, callback) {
            request({
                endpoint: getPath(collection, id),
                method: 'PUT',
                json: body
            }, callback);
        };

        this.delete = function (id, recursive, callback) {
            if (typeof recursive === 'function') {
                callback = recursive;
                recursive = false;
            }

            var object = {
                endpoint: getPath(collection, id),
                method: 'DELETE',
            };

            if (recursive) {
                object.qs = { recursive: true };
            }

            request(object, callback);
        };
    };

    this.create = function (collection, schema, innerCollections) {
        return new Collection(collection, schema, innerCollections);
    };
};
