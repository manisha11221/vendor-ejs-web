const jwt = require('jsonwebtoken');
const authvendormodel = require('../models/vendorModel');

const authSchema = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    console.log("token",token);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }

    const tokenWithoutPrefix = token.split(' ')[1];
    // console.log("token",tokenWithoutPrefix);

    try {
      const decodedUser = jwt.verify(tokenWithoutPrefix, 'vendor-token');
    //   console.log("decodedUser",decodedUser);

      const user = await authvendormodel.findOne({ _id: decodedUser._id });
        console.log("user_data_token",user._id);

      if (!user) {
        return res.status(404).json({
          message: 'You are not authorized for this action',
          status: 409,
        });
      }

      req.token = tokenWithoutPrefix;
      req.user = user;
      next();
    } catch (error) {
      console.error('Token Verification Error:', error);
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
  } catch (error) {
    console.error('Middleware Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = authSchema;
