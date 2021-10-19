import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CryptAndDecryptServiceService } from './crypt-and-decrypt.service';
import { GenerateSecretService } from './generate-secret.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './_services';
import { tap } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SchedaSlingAttributeBean } from './_models/SchedaSlingAttributeBean';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GETService {

  constructor(
    private authenticationService: AuthenticationService,
    private cryptService: CryptAndDecryptServiceService,
    private deviceService: DeviceDetectorService,
    private generateSecretService: GenerateSecretService,
    private http: HttpClient
    ) {
  }

  onSubmit(){
  }
  getContent(id: number, parameterRequest: string){

    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getUTCDate();
    let date : string= `${year}/${month}/${day}`;
    return this.http.get(environment.apiUrl + `/Schede/${date}/${id}/${parameterRequest}`, { observe: 'response' })
    //return this.http.get(`http://localhost:8080/Schede/${date}/${id}/${parameterRequest}`, { observe: 'response' })
  }
  getSmartlist(smartlist: string){
    return this.http.get<any>(environment.apiUrl + environment.smartlistJcrPath + '/' + smartlist + `.children.json?return_top=10`);
    //return this.http.get<any>(`http://next2u.myddns.com:8080/configuration/smartlist/endoscopia-chivasso/${smartlist}.children.json?return_top=20`);
  }

  getValidate(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    return this.http.get<any>(environment.apiUrl + '/next-forms/registro-protocollo/endoscopia-chivasso/protocollo/validate.json', httpOptions);
    //return this.http.get<any>('http://next2u.myddns.com:8080/next-forms/dati/endoscopia-chivasso/protocollo/validate.json', httpOptions);
  }

//   getProtocol(password: string){
// //    let encryptedPassword = this.cryptService.crypt(password);
//     var httpOptions = {
//       headers: new HttpHeaders({
//       'Content-Type':  'multipart/form-data; boundary=<calculated when request is sent>',
// //      'req_validate_protocol': `${encryptedPassword}`
//     }) 
//   };
//   return this.http.get<any>(environment.apiUrl + '/next-forms/protocol/?subservice_name=next-forms-protocol-endchivasso', httpOptions);
//     //return this.http.get<any>('http://next2u.myddns.com:8080/next-forms/protocol/?subservice_name=next-forms-protocol-endchivasso', httpOptions);
//   }
   //Chiamata per la creazione di un nuovo protocollo.
  getProtocol(req_validate_protocol: string) {
    // this.logger.log(logLevelModel.debug, GetService.name, "INIZIO - Chiamata per la creazione di un nuovo protocollo.");
    let result:string
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
        // 'req_validate_protocol': this.getReqValidateProtocol(),
        'req_user': this.authenticationService.getUsername(),
      })
    };
    // this.logger.log(logLevelModel.debug, GetService.name, "FINE - Chiamata per la creazione di un nuovo protocollo.");
    // return this.http.get < any > (environment.apiUrl + `/next-forms/protocol?subservice_name=next-forms-protocol-endchivasso`, httpOptions);
    return this.http.get < any > (environment.apiUrl + `/next-forms/protocol?subservice_name=next-forms-protocol-endchivasso`, httpOptions);
   
  }

  //Metodo per il crypt della password da utilizzare per la creazione di un nuovo protocollo.
  // getReqValidateProtocol(req_validate_protocol: string) {
  //   // this.logger.log(logLevelModel.debug, GetService.name, "INIZIO - Crypt della password da utilizzare per la creazione di un nuovo protocollo.");
  //   // this.logger.log(logLevelModel.debug, GetService.name, "FINE - Crypt della password da utilizzare per la creazione di un nuovo protocollo.");
  //   // return this.cryptService.crypt(localStorage.getItem("pin"), this.cryptService.decrypt(localStorage.getItem("encrypted-key"), this.generateSecretService.getInternalSecret()));
  //   // return this.cryptService.crypt(localStorage.getItem("pin"), this.cryptService.decrypt(this.authenticationService.getUserSecret(), this.generateSecretService.getInternalSecret()));
  //   return this.cryptService.crypt(req_validate_protocol, this.cryptService.decrypt(this.authenticationService.getUserSecret(), this.generateSecretService.getInternalSecret()));
  // }

  getAllSmartlists(){
    return this.http.get<any>(environment.apiUrl + environment.smartlistJcrPath + '.children.json?return_top=2000');
    //return this.http.get<any>('http://next2u.myddns.com:8080/configuration/smartlist/endoscopia-chivasso.children.json?return_top=2000');
  }
  getSaved(){
    let path = sessionStorage.getItem("cardPath")
    return this.http.get<any>(environment.apiUrl + '/' + path)
    //return this.http.get<any>('http://next2u.myddns.com:8080/' + path)
  }
  getAuthentication(){
    let secret = this.generateSecretService.createSecret();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get<any>(environment.apiUrl + '/next-forms/authentication.json', httpOptions);
    //return this.http.get<any>('http://next2u.myddns.com:8080/next-forms/authentication.json', httpOptions);
  }
  
  getWorkingData() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let deviceInfo = this.deviceService.getDeviceInfo();
    let path: string;
    if (this.deviceService.isDesktop()) {
      path = environment.pathWorkAreaSchedaDesktop;
    } // da valutare se limitarsi a gestire il semplice else per tutti i device diversi da Desktop
    else if (this.deviceService.isMobile || this.deviceService.isTablet) {
      path = environment.pathWorkAreaSchedaTablet;
    }
    let url = "/bin/cpm/nodes/property.map.json/" + path;
    return this.http.get<SchedaSlingAttributeBean[]>(url, httpOptions);
  }

  getWithData(body: SchedaSlingAttributeBean[], toUrl: string): any {
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/pdf',
    //     'data': JSON.stringify(body)
    //   }),
    //   responseType: 'arraybuffer'
    // };
    return this.http.get(toUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/pdf',
        'data': JSON.stringify(body)
      }),
      responseType: 'arraybuffer'
    });
  }

  getActiveData() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let path: string;
    path = environment.pathWorkAreaSchedaAttive;
  
    let url = "/bin/cpm/nodes/property.map.json/" + path;
    return this.http.get<SchedaSlingAttributeBean[]>(url, httpOptions);
  }

}
