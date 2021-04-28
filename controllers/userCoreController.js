const {StatusCodes} = require('http-status-codes');
const {ERRORS,RESPONSE_STATUS} = require("../config/constants");
const BadRequestError = require("../handlers/error/badRequestError");
const {isObjectEmpty} = require("../utils/validate");
const {inspectQuery} = require("../utils/inspectQuery");
const modelService = require("../services/userCoreService");

module.exports = {
	create: async (req, res) => {
		try {
			if (isObjectEmpty(req.body)) {
				throw new BadRequestError(ERRORS.INVALID_POST_DATA);
			}
			let response = await modelService.create(req.body);
            res.send({status: RESPONSE_STATUS.STATUS_SUCCESS, data: response});
		} catch (err) {
            let errorCode = err.errorCode ? err.errorCode : StatusCodes.INTERNAL_SERVER_ERROR;
			res.status(errorCode).send({ status: RESPONSE_STATUS.STATUS_FAIL, error:  { errorCode, message : err.message}});
		}
	},

	list: async (req, res) => {
		try {
			let requestObj = inspectQuery(req.query);
			let response = await modelService.list(requestObj.query,requestObj.select);
			res.send({status: RESPONSE_STATUS.STATUS_SUCCESS, data: response});
		} catch (err) {
			res.status(err.errorCode ? err.errorCode : StatusCodes.INTERNAL_SERVER_ERROR).send({ status: RESPONSE_STATUS.STATUS_FAIL,error: err.message });
		}
	},
	
	get: async (req, res) => {
		try {
			if (isObjectEmpty(req.query)) {
				throw new BadRequestError(ERRORS.INVALID_GET_QUERY);
			}
			let requestObj = inspectQuery(req.query);
			let response = await modelService.get(requestObj.query,requestObj.select);
			res.send({status: RESPONSE_STATUS.STATUS_SUCCESS, data: response});
		} catch (err) {
			res.status(err.errorCode ? err.errorCode : StatusCodes.INTERNAL_SERVER_ERROR).send({ status: RESPONSE_STATUS.STATUS_FAIL,error: err.message });
		}
	},

	update: async (req, res) => {
		try {
			if (isObjectEmpty(req.query)) {
				throw new BadRequestError(ERRORS.INVALID_GET_QUERY);
			}
			if (isObjectEmpty(req.body)) {
				throw new Error(ERRORS.INVALID_POST_DATA);
			}
			let response = await modelService.update(req.query, req.body);
			res.send({status: RESPONSE_STATUS.STATUS_SUCCESS, data: response});
		} catch (err) {
			res.status(err.errorCode ? err.errorCode : StatusCodes.INTERNAL_SERVER_ERROR).send({ status: RESPONSE_STATUS.STATUS_FAIL,error: err.message });
		}
	},

	updateOne: async (req, res) => {
		try {
			let response = await modelService.updateOne(req.query, req.body);
			res.send({status: RESPONSE_STATUS.STATUS_SUCCESS, data: response});
		} catch (err) {
			res.status(err.errorCode ? err.errorCode : StatusCodes.INTERNAL_SERVER_ERROR).send({ status: RESPONSE_STATUS.STATUS_FAIL,error: err.message });
		}
	},

	delete: async (req, res) => {
		try {
			if (isObjectEmpty(req.query)) {
				throw new BadRequestError(ERRORS.INVALID_GET_QUERY);
			}
			let response = await modelService.delete(req.query);
			res.send({status: RESPONSE_STATUS.STATUS_SUCCESS, data: response});
		} catch (err) {
			res.status(err.errorCode ? err.errorCode : StatusCodes.INTERNAL_SERVER_ERROR).send({ status: RESPONSE_STATUS.STATUS_FAIL,error: err.message });
		}
	},

	deleteOne: async (req, res) => {
		try {
			if (isObjectEmpty(req.query)) {
				throw new BadRequestError(ERRORS.INVALID_GET_QUERY);
			}
			let response = await modelService.deleteOne(req.query);
			res.send({status: RESPONSE_STATUS.STATUS_SUCCESS, data: response});
		} catch (err) {
			res.status(err.errorCode ? err.errorCode : StatusCodes.INTERNAL_SERVER_ERROR).send({ status: RESPONSE_STATUS.STATUS_FAIL,error: err.message });
		}
	},

	count: async (req, res) => {
		try {
			let requestObj = inspectQuery(req.query);
			let response = await modelService.count(requestObj.query);
			res.send({status: RESPONSE_STATUS.STATUS_SUCCESS, data: response});
		} catch (err) {
			res.status(err.errorCode ? err.errorCode : StatusCodes.INTERNAL_SERVER_ERROR).send({ status: RESPONSE_STATUS.STATUS_FAIL,error: err.message });
		}
	},
};