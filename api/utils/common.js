const CryptoJS = require("crypto-js");
const cryptoSecret = process.env.CRYPTOSECRET;
const jwtSecret = process.env.JWTSECRET;
const jwt = require("jsonwebtoken");

const decryptData = (data) => {
  var bytes = CryptoJS.AES.decrypt(data, cryptoSecret);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

const checkEmailExist = async (key, value) => {
  const result = await key.findOne({
    where: {
      email: value,
    },
  });
  return result;
};

const generateToken = (data, duration) => {
  return new Promise(function (resolve, reject) {
    try {
      let token;
      if (duration) {
        token = jwt.sign(data, jwtSecret, { expiresIn: duration });
        return resolve(token);
      } else {
        token = jwt.sign(data, jwtSecret);
        return resolve(token);
      }
    } catch (err) {
      return reject(err);
    }
  });
};

const verifyAuthToken = (token) => {
  return new Promise(function (resolve, reject) {
    try {
      const getToken = token.split(" ")[1];
      if (token) {
        let decode = jwt.verify(getToken, jwtSecret);
        if (decode) {
          return resolve(decode);
        }
      } else {
        return reject("Invalid token!");
      }
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = {
  decryptData,
  checkEmailExist,
  generateToken,
  verifyAuthToken,
};
