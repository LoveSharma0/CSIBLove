const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.registerUser = async (req, res) => {

try {

const { name, email, password } = req.body;

if (!name || !email || !password) {
return res.status(400).json({
message: "All fields are required"
});
}

const existingUser = await User.findOne({ email });

if (existingUser) {
return res.status(400).json({
message: "User already exists"
});
}

const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
name,
email,
password: hashedPassword
});

await newUser.save();

res.status(201).json({
message: "User registered successfully"
});

} catch (error) {

console.log(error);

res.status(500).json({
message: "Server error"
});

}

};