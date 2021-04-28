const HttpStatus = require('http-status-codes');
const NotFoundError = require("../error/notFoundError");
const {RESPONSE_STATUS} = require("../../config/constants");
/**
 * catch-all error handler
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const genericErrorHandler = function (error, req, res, next) {
    res.status(error.errorCode || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
    .send({status:RESPONSE_STATUS.STATUS_FAIL, error: {errorCode: error.errorCode || HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, message: error.message || 'Something went wrong. Please try again'} });
};

/**
 * Unknown routes handler
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const unknownRoutesHandler = function (req, res, next) {
    const error = new NotFoundError('API not found');
    next(error);
};

module.exports = {
    genericErrorHandler, unknownRoutesHandler
};