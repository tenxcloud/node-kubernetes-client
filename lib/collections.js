var errors = require('./errors')
  , createSchema = require('json-gate').createSchema
  , async = require('async')
  , util = require('util');

require('sugar');

var factory = module.exports = function (request) {
    var getPath = function () {
        return [].slice.call(arguments).filter(function (each) {
            return each !== null && typeof each !== 'undefined';
        }).join('/');
    };

    var InnerCollection = function (parentCollection, id, collection, options) {
        this.get = function (callback) {
            request({
                endpoint: getPath(parentCollection, id, collection)
                , method: 'GET'
                , options : options
            }, function (err, result) {
                callback(err, result && (result.resources || result));
            });
        };

        this.post = function (innerId, callback) {
            request({
                endpoint: getPath(parentCollection, id, collection, innerId)
                , method: 'POST'
                , options : options
            }, function (err, result) {
                callback(err, result && (result.resources || result));
            });
        };

        this.put = function (innerId, callback) {
            request({
                endpoint: getPath(parentCollection, id, collection, innerId)
                , method: 'PUT'
                , options : options
            }, function (err, result) {
                callback(err, result && (result.resources || result));
            });
        };

        //added by Ryan Clarke (ryclarke@cisco.com)
        this.patch = function (innerId, callback) {
            request({
                endpoint: getPath(parentCollection, id, collection, innerId)
                , method: 'PATCH'
                , options: options
            }, function (err, result) {
                callback(err, result && (result.resources || result));
            });
        };

        this.delete = function (innerId, callback) {
            request({
                endpoint: getPath(parentCollection, id, collection, innerId)
                , method: 'DELETE'
                , options : options
            }, function (err, result) {
                callback(err, result && (result.resources || result));
            });
        };
    };

    var Collection = function (collection, schema, innerCollections, options) {
        //Collection manages interaction with RESTful collection on kubernetes
        var makeObject = function (id) {
            var obj = {};

            if (typeof id === 'object') {
                Object.merge(obj, id);
                if (id.metadata) {
                    id = id.metadata.guid || id.metadata.name;
                } else if (typeof id.index !== 'undefined') {
                    id = id.index;
                }else if (typeof id.id !== 'undefined') {
                    id = id.id;
                }
            }

            (innerCollections || []).each(function (each) {
                var method
                  , innerCollectionName
                  , isNestedCollection = false;
                    options = options || {};

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
                    obj[method] = new InnerCollection(collection, id, innerCollectionName, options);
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

            var finished = false
              , results  = [];

            var requestObject = {
                endpoint: getPath(collection, query)
                , page:     multiResults ? 1 : null // don't page if we're
                , method:   'GET'                   // looking up one item
                , options : options
            };

            if (query && typeof query === 'object') {
                requestObject.endpoint = getPath(collection);
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
        /**
        this.getBy = function (query, callback) {
            this.get(function (err, result) {

                if (err) {
                    return callback(err);
                }

                var match = result.find(query);

                callback(match ? null : new errors.NotFoundError(query), match);
            });
        };
        **/
        this.getBy = function (query, callback) {
            /**
            var qstring = '';
            if(typeof query === 'object') {
                Object.keys(query, function (key, value) {
                    qstring += '&' + key + '=' + value;
                });
                qstring = qstring.substring(1);
            } else {
                qstring = query;
            }
            **/
            var endpoint = collection + '?namespace=' + query.namespace;
            if (query.name) {
               endpoint = collection + '/' + query.name + '?namespace=' + query.namespace;
            }
            request({
                endpoint: endpoint
                , method: 'GET'
                , options : options
            }, callback);
        };

        this.getByName = function (name, callback) {
            this.get({name: name}, callback);
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
                endpoint: getPath(collection)
                , method: 'POST'
                , json: body
                , options : options
            }, callback);
        };

        this.update = function (id, body, callback) {
            request({
                endpoint: getPath(collection, id)
                , method: 'PUT'
                , json: body
                , options : options
            }, callback);
        };

        //added by Ryan Clarke (ryclarke@cisco.com)
        this.patch = function (id, body, callback) {
            request({
                endpoint: getPath(collection, id)
                , method: 'PATCH'
                , json: body
                , options : options
            }, callback);
        };

        this.delete = function (id, recursive, callback) {
            if (typeof recursive === 'function') {
                callback = recursive;
                recursive = false;
            }

            var object = {
                endpoint: getPath(collection, id)
                , method: 'DELETE'
                , options : options
            };

            if (recursive) {
                object.json = {"kind":"DeleteOptions", "apiVersion":"v1", "propagationPolicy":"Foreground"};
                object.qs = {recursive: true};
            }

            request(object, callback);
        };
    };

    this.create = function (collection, schema, innerCollections, options) {
        return new Collection(collection, schema, innerCollections, options);
    };
};
