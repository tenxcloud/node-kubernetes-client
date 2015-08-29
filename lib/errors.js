var util = require('util');

var ClientError = module.exports.ClientError = function (body, statusCode) {
    this.message = body;
    this.statusCode = statusCode;
};

util.inherits(ClientError, Error);

var InvalidDataError = module.exports.InvalidDataError = function (body) {
    ClientError.call(this, body, 400);
};

util.inherits(InvalidDataError, ClientError);

var AuthorizationError = module.exports.AuthorizationError = function (body, statusCode) {
    ClientError.call(this, body, statusCode);
};

util.inherits(AuthorizationError, ClientError);

var NotFoundError = module.exports.NotFoundError = function (body) {
    ClientError.call(this, body, 404);
};

util.inherits(NotFoundError, ClientError);

module.exports.get = function (resp) {
    switch (resp.statusCode) {
    case 400:
        return new InvalidDataError(resp.body);
    case 401:
    case 403:
        return new AuthorizationError(resp.body, resp.statusCode);
    case 404:
        return new NotFoundError(resp.body);
    default:
        return new ClientError(resp.body, resp.statusCode);
    }

};
