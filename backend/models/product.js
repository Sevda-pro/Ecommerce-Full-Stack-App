const mongoose = require("mongoose");
const Product = new mongoose.Schema({
	productid: {
		type: String,
	},
	userId: {
		type: String,
	}
});

module.exports = mongoose.model("Product",Product);
