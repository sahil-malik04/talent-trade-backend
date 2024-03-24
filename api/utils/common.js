const CryptoJS = require("crypto-js");

const decryptPassword = (password) => {
  var bytes = CryptoJS.AES.decrypt(password, "tt@123");
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
  decryptPassword,
  checkEmailExist,
};
