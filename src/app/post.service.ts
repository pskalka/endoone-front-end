import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SchedaSlingAttributeBean } from './_models/SchedaSlingAttributeBean';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class POSTService {

  formData!: FormData;
  constructor(private http: HttpClient, private deviceService: DeviceDetectorService) {
  }
  onSubmit() {
  }

  //Metodo per inviare e salvare informazioni lato Server.
  postContent(body: any) {
    // this.logger.log(logLevelModel.debug, PostService.name, "INIZIO - Invio e salvataggio delle informazioni lato Server.");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let cardPath = sessionStorage.getItem("cardPath");
    let url = environment.apiUrl + "bin/cpm/nodes/property.json/" + cardPath;
    // this.logger.log(logLevelModel.debug, PostService.name, "FINE - Invio e salvataggio delle informazioni lato Server.");
    return this.http.put(url, body, httpOptions);
  }

  //Metodo per inviare e salvare informazioni lato Server.
  postContentToUrl(body: any, toUrl: string) {
    // this.logger.log(logLevelModel.debug, PostService.name, "INIZIO - Invio e salvataggio delle informazioni lato Server.");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = environment.apiUrl + "bin/cpm/nodes/property.json/" + toUrl;
    // this.logger.log(logLevelModel.debug, PostService.name, "FINE - Invio e salvataggio delle informazioni lato Server.");
    return this.http.put(url, body, httpOptions);
  }

  //Metodo per inviare e salvare informazioni lato Server.

  postSlingNodeAttribute(attributeModel: any) {
    // this.logger.log(logLevelModel.debug, PostService.name, "INIZIO - Invio e salvataggio delle informazioni lato Server.");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // useragent
    let deviceInfo = this.deviceService.getDeviceInfo();
    // const isMobile = this.deviceService.isMobile();
    // const isTablet = this.deviceService.isTablet();
    // const isDesktopDevice = this.deviceService.isDesktop();
    console.log(deviceInfo);
    // console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    // console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    // console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
    let path: string;
    if (this.deviceService.isDesktop()) {
      path = environment.pathWorkAreaSchedaDesktop;
    } // da valutare se limitarsi a gestire il semplice else per tutti i device diversi da Desktop
    // else if(this.deviceService.isMobile || this.deviceService.isTablet){
    else {
      path = environment.pathWorkAreaSchedaTablet;
    }

    let url = "/bin/cpm/nodes/property.json/" + path;
    return this.http.put(url, attributeModel, httpOptions);
  }

  // postContent(body: FormData, id: number){

  //   let year = new Date().getFullYear();
  //   let month = new Date().getMonth() + 1;
  //   let day = new Date().getUTCDate();
  //   let date : string= `${year}/${month}/${day}/`;
  //   let numeroProtocollo = sessionStorage.getItem("protocol");
  //   return this.http.post(`http://localhost:8080/Schede/${date}` + id + numeroProtocollo, body,{ observe: 'response' })
  // }

  createBody(key: string, value: string) {
    this.formData.append(key, value);
  }

  postWithData(body: SchedaSlingAttributeBean[], toUrl: string): any {
    return this.http.post(toUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      }),
      responseType: 'arraybuffer'
    });
  }

  deleteAttributes(names: string[]) : Observable<any> {
    let deviceInfo = this.deviceService.getDeviceInfo();
    // const isMobile = this.deviceService.isMobile();
    // const isTablet = this.deviceService.isTablet();
    // const isDesktopDevice = this.deviceService.isDesktop();
    console.log(deviceInfo);
    // console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    // console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    // console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
    let path: string;
    if (this.deviceService.isDesktop()) {
      path = environment.pathWorkAreaSchedaDesktop;
    } // da valutare se limitarsi a gestire il semplice else per tutti i device diversi da Desktop
    // else if(this.deviceService.isMobile || this.deviceService.isTablet){
    else {
      path = environment.pathWorkAreaSchedaTablet;
    }

    let url = "/bin/cpm/nodes/property.remove.json/" + path;
    return this.http.request("delete", url, {
      body: { "names": names },
      headers: new HttpHeaders({
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'text/plain;charset=UTF-8',
        "x-requested-with": "XMLHttpRequest"
      })
      //, params: new HttpParams().set("names", JSON.stringify(names))
    });
  }

}
