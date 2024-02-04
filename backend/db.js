const mongoose = require("mongoose");
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			'mongodb://127.0.0.1:27017/ecommerce'
		);
		console.log(`MongoDB Connected`);
	} catch (error) {
		console.error("error is",error);
	}
};
module.exports = connectDB;
