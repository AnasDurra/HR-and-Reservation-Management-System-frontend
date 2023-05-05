import CryptoJS from "crypto-js";

const secretPass = "XkhZG4fW2t2W";

//Encrypting text
export function encrypt(text) {
    const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        secretPass
    ).toString();

    return data;
}

// Decrypting text
export function decrypt(text) {
    if(text === undefined) {
        return null;
    }
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return data;
}