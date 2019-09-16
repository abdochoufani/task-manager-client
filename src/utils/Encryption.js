import CryptoJS from 'crypto-js'


 const encrypt = {
    hashPassword : (password) => {
        var hash= CryptoJS.SHA256(password)
        var hexhash = hash.toString(CryptoJS.enc.hex)
        return hexhash
    },
    
    hash : (password) => {
        return CryptoJS.SHA256(password).toString(CryptoJS.enc.Utf8)
    },

    encryptData : (data, key) => {
        data =JSON.stringify(data)
        const encrypted = CryptoJS.AES.encrypt(data, key)
        return encrypted.toString()
    },

    decryptData: (data, key) => {
        data = data.toString()
        const decrypted = CryptoJS.AES.decrypt(data, key)   
        return decrypted.toString(CryptoJS.enc.Utf8)
    }
}


export default encrypt

