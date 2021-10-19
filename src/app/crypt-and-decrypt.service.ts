import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptAndDecryptServiceService {

  constructor() { }
  crypt(text, keyInput){

    var key = CryptoJS.enc.Utf8.parse(keyInput);
    var srcs = CryptoJS.enc.Utf8.parse(text);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    encrypted = encrypted.toString();
    return encrypted;
  }
  decrypt(text, keyInput){
    var key = CryptoJS.enc.Utf8.parse(keyInput);
    var decrypt = CryptoJS.AES.decrypt(text, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
}
