var path = require('path');
var util = require('util');
var http = require('http');

function HttpError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODE[status] || "Error";

}

util.inherits(HttpError, Error);

exports.HttpError = HttpError;