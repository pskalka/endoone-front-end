import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GenerateSecretService {

  constructor() { }

  createSecret(){
    let secret: string = "";
    secret = secret + this.setStartCharacters();
    secret = secret + this.setSecretCharacters();
    secret = secret + this.setEndCharacters();
    localStorage.setItem("generatedSecret",  secret);
    return secret;
  }
  setStartCharacters(){ 
    return this.getRandomString(18);
  }
  setSecretCharacters(){
    return this.getRandomString(32);
  }
  setEndCharacters(){ 
    return this.getRandomString(65);
  }
  getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
getInternalSecret(){
  let secret = localStorage.getItem("generatedSecret");
  let internalSecret: string = secret.substr(18,32);
  return internalSecret;
}
}
