import CryptoJS from 'crypto-js'



 const encrypt = {

    hashPassword : (password) => {
        CryptoJS.SHA256(password)
    },

    key512Bits : (password) => {
        var salt = CryptoJS.lib.WordArray.random(128 / 8);
    
        var key512Bits = CryptoJS.PBKDF2(password, salt, {
            keySize: 512 / 32
          });
          return key512Bits
    },
    hash : (password) => {
        return CryptoJS.SHA256(password)
    },

    encryptData : (data, key) => {
        return CryptoJS.AES.encrypt(data, key);
    },

    decryptData: (data, key) => {
        CryptoJS.DES.decrypt(data, key);
    }
}


export default encrypt

