const CryptoJS = require("crypto-js");
const secret = process.env.CRYPTOSECRET;

const decryptData = (data) => {
  var bytes = CryptoJS.AES.decrypt(data, secret);
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

module.exports = {
  decryptData,
  checkEmailExist,
};
