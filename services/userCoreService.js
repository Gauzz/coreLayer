const DataModel = require("../models/User");

module.exports = {
	create: async (create) => {
		let data = await DataModel.create(create);
		return data;
	},

	list: async (filter,select=null) => {
		let data;
		if(!filter.isDeleted){
			filter.isDeleted = false;
		}
		if(select){
			data = await DataModel.find(filter).select(select).exec();
		}else{
			data = await DataModel.find(filter).exec();
		}
		return data;
	},

	get: async (filter,select=null) => {
		let data;
		if(!filter.isDeleted){
			filter.isDeleted = false;
		}
		if(select){
			data = await DataModel.findOne(filter).select(select).exec();
		}else{
			data = await DataModel.findOne(filter).exec();
		}
		return data;
	},

	update: async (filter, update) => {
		let data = await DataModel.updateMany(filter, update, {new: true}).exec();
		return data;
	},

	updateOne: async (filter, update) => {
		let data = await DataModel.findOneAndUpdate(filter, update, {new: true}).exec();
		return data;
	},

	delete: async (filter) => {
		//let data = await DataModel.deleteMany(filter);		//This is HARD DELETE
		let data = await DataModel.updateMany(filter, {isDeleted:true}).exec();			//This is SOFT DELETE
		return data;
	},

	deleteOne: async (filter) => {
		//let data = await DataModel.deleteOne(filter);		//This is HARD DELETE
		let data = await DataModel.findOneAndUpdate(filter, {isDeleted:true}).exec();	//This is SOFT DELETE
		return data;
	},

	count : async(filter) => {
		if(!filter.isDeleted){
			filter.isDeleted = false;
		}
		let data = await DataModel.countDocuments(filter).exec();
		return data;
	}
};
