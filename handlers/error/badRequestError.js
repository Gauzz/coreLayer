class BadRequestError extends Error {
    constructor (message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.errorCode = 400;
    }

    statusCode () {
        return this.errorCode;
    }
}

module.exports = BadRequestError;