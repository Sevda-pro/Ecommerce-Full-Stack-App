const express = require('express')
const app = express();
const cors = require('cors')
const User = require('./models/signup.js')
const Contact = require('./models/Contact.js')
const Product = require('./models/product.js')
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const connectDB = require('./db.js')
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());
function generateAccessToken(id, premium) {
	let x = jwt.sign({ userId: id }, "secretKey");
	return x;
}
const authentication = async (req, res, next) => {
	try {

		const token = req.header("Authorization");
		// console.log(token);
		const { userId } = jwt.verify(token, "secretKey");
		// console.log(userId);
		let currUser = await User.findById(userId);
		req.user = currUser;
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ success: false, message: error });
	}
};
app.post('/', async (req, res) => {
	try {
		const { email } = req.body;
		let obj = await User.findOne({ email: email });
		if (obj) {
			res.status(409).json({ message: "email already exits", success: false });
		} else {
			let salt = await bcrypt.genSalt(10);
			let hashedPassword = await bcrypt.hash(req.body.password, salt);
			req.body.password = hashedPassword;

			let result = await User.create(req.body);
			res.status(201).json({ success: true, msg: "Profile created", user: result });
		}
	} catch (error) {
		console.log(error);
		res.json({ message: error, success: false });
	}
})
app.post('/contact', async (req, res, next) => {
	try {
		let result = await Contact.create(req.body)
		res.status(200).json({ message: "We will get back to you within 48 hours.", success: true, result });
	} catch (error) {
		res.status(500).json({ message: error, success: false });
	}
})
app.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		let obj = await User.findOne({ email: email });
		if (obj) {
			let passwordMatch = await bcrypt.compare(password, obj.password);
			if (passwordMatch) {
				res.status(200).json({ name: obj.name, message: "login successfull", success: true, token: generateAccessToken(obj.id) });
			} else {
				res.status(400).json({ success: false, message: "invalid password" });
			}
		} else {
			res.status(404).json({ success: false, message: "email does not exist" });
		}
	} catch (error) {
		res.status(500).json({ message: error, success: false });
	}
})
app.post('/addproduct', authentication, async (req, res) => {
	try {
		const { productid } = req.body;
		const obj = {
			productid: productid,
			userId: req.user._id
		}
		let result = await Product.create(obj)
		res.status(200).json({ message: "Product added to cart", success: true, result });
	} catch (err) {
		console.log(err)
	}

})
app.get('/products', authentication, async (req, res) => {
	try {
			let userId= req.user._id
		let result = await Product.find({ userId: userId });
		res.status(200).json({ message: "Product added to cart", success: true, result });
	} catch (err) {
		console.log(err)
	}

})
app.delete('/deleteproduct/:productid', authentication, async (req, res) => {
    try {
        const { productid } = req.params;
        const userId = req.user._id;

        // Delete the product based on productid and userId
        let result = await Product.findOneAndDelete({ productid: productid, userId: userId });

        if (result) {
            res.status(200).json({ message: "Product deleted successfully", success: true, result });
        } else {
            res.status(404).json({ message: "Product not found for the given user", success: false });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
    }
});

const apprun = () => {
	connectDB()
	app.listen(5000);
}
apprun();