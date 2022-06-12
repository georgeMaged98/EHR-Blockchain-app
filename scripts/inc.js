// var CryptoJS = require("crypto-js");
// var ciphertext = CryptoJS.AES.encrypt("100", 'secret key 123').toString();
// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

const encrypt = (data, key) => {
  var CryptoJS = require('crypto-js')
  var ciphertext = CryptoJS.AES.encrypt(data, key).toString()
  return ciphertext
}
const decrypt = (ciphertext, key) => {
  var CryptoJS = require('crypto-js')
  var bytes = CryptoJS.AES.decrypt(ciphertext, key)
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8)
  return decryptedData
}
const hash = (text) => {
  var SHA256 = require('crypto-js/sha256')
  return SHA256(text)
}
// let en=encrypt("samer",'key')
// let ans =decrypt(en,'key')
// console.log(ans)
module.exports = { encrypt, decrypt, hash }
