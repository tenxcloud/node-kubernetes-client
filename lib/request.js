// add header strictSSL: false
// modified by huangqg

var errors  = require('./errors');

var request = require('request');

require('sugar');

var url     = require('url'),
    util    = require('util');

module.exports = function (protocol, host, token) {
    var getUrl = function (object) {
        /**
        return url.format({
            protocol: protocol,
            hostname: host,
            pathname: 'api/v1beta2/' + object.endpoint
        });
        **/
        return protocol + '://' + host + '/api/v1beta2/' + object.endpoint;
    };

    var getAuthUrl = function (callback) {
        request({
            url: getUrl({ endpoint: 'info' }),
            json: true,
            strictSSL: false
        }, function (err, resp, body) {
            if (err) {
                return callback(err);
            }

            if (resp.statusCode !== 200) {
                return callback(resp.statusCode, body);
            }

            callback(null, body.authorization_endpoint + '/oauth/token');
        });
    };
    var isSuccess = function (code) {
        return (code - (code % 200)) === 200;
    };

    var makeRequest = function (object, callback) {
        object = Object.clone(object);
        object.url = getUrl(object);
        console.log('object.url: ' + object.url);
        delete object.endpoint;
        object.json = object.json || true;
        if (object.json) {
            if ([ 'object', 'boolean' ].none(typeof object.json)) {
                object.body = object.json;
                object.json = undefined;
            }
        }
        console.log('>>>====>>> Request object is ' + JSON.stringify(object));
        if (object.page) {
            if (! object.qs) {
                object.qs = {};
            }

            object.qs.page = object.page;
            delete object.page;
        }
        //@important! add by huangqg
        //skip-ssl
        object.strictSSL = false;

        return request(object, function (err, resp, body) {
            if (err) {
                return callback(err);
            }

            if (isSuccess(resp.statusCode)) {
                return callback(null, body);
            }

            return callback(errors.get(resp));
        });
    };

    return function (object, callback) {
        if (token) {
            object.headers = {
                Authorization: 'bearer ' + token
            };
        }
        return makeRequest(object, function (err, result) {
            if (err) {
                console.log('error happen: ' + err);
            }

            callback(err, result);
        });
    };
};
