
const user = require("../models/userModels");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const userNameCheck = await user.findOne({ username });
    if (userNameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await user.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "email already used", status: false });
    const hashPassword = await bcrypt.hash(password, 10);
    const User = await user.create({
      email,
      username,
      password: hashPassword,
    });
    delete User.hashPassword;
    return res.json({ status: true, User });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ email });

    if (!User)
       return res.json({ msg: "invalid login", status: false });

    const matchPassword = await bcrypt.compare(password, User.password);

    if (!matchPassword)
      return res.json({ msg: "invalid login", status: false });
    delete User.password;

    return res.json({ status: true, User });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.avatar = async (req, res, next) => {
  try {
    const userId  = req.params.id;
    const avtarImage = req.body.image;

    console.log(req.body.image);
    console.log(userId);

    const userData = await user.findByIdAndUpdate(userId, { 
      isAvtarImageSet: true,
      avtarImage
    },{new: true});
  
    return res.json({
      isSet: userData.isAvtarImageSet,
      image: userData.avtarImage,
    });
    
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await user.find({_id: {$ne: req.params.id}}).select([
      "email",
      "username",
      "avtarImage",
      "_id",
    ]);
return res.json(users);
  
  } catch (error) {
    next(error);
    console.log(error);
  }
};
