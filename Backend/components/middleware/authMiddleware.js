// const User = require("../modal/Users");
// const jwt = require("jsonwebtoken");

// const secretkey = process.env.secretkey;

// const authMiddleware = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ status: false, message: "All fields is Require!" });
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ status: false, message: "Email Already Exist" });
//     }
//     const hashPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashPassword });
//     await newUser.save();
//     return res
//       .status(201)
//       .json({ status: true, message: "Registred Successfully!" });
//     next();
//   } catch (error) {
//     return res.status(400).json({
//       status: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

// module.exports = authMiddleware;
