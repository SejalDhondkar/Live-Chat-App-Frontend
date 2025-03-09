import CryptoJS from "crypto-js";
import  "dotenv";

const SECRET_KEY = import.meta.env.VITE_AES_SECRET_KEY;

// Encrypt a message
export const encryptMessage = (message) => {
    const iv = CryptoJS.lib.WordArray.random(16); // Generate IV
    const encrypted = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return {
        encryptedMessage: encrypted.toString(),
        iv: CryptoJS.enc.Base64.stringify(iv) // Store IV for decryption
    };
};

// Decrypt a message
export const decryptMessage = (encryptedMessage, iv) => {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
        iv: CryptoJS.enc.Base64.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    
    return bytes.toString(CryptoJS.enc.Utf8);
};
