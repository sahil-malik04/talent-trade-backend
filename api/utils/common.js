const CryptoJS = require("crypto-js");

const decryptPassword = (password) => {
  var bytes = CryptoJS.AES.decrypt(password, "tt@123");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = {
  decryptPassword,
};
