"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = ErrorHandler;
function ErrorHandler(statusCode, message) {
    const err = new Error();
    err.statusCode = statusCode;
    err.message = message;
    return err;
}
