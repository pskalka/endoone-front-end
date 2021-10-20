import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { GenerateSecretService } from '../generate-secret.service';
import { User } from '../_models';
import { SalaModel } from '../_models/sala-model';
import { DeviceModel } from '../_models/device-model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public userLoginResponse: Observable<User>;
  secretString: string;

  @SessionStorage("user")
  private user: User;

  constructor(private router: Router,
    private generateSecretService: GenerateSecretService,
    private http: HttpClient,
    private sessionStorage: SessionStorageService) {
  }

  //Metodo di login.
  login(username: string, password: string) : Observable<any> {
  
    let secret = this.generateSecretService.createSecret();
    let httpOptions = {
    };

    let emptyHttpOptions = {
      headers: new HttpHeaders({})
    };

    let formData: FormData = new FormData();
    formData.append("j_username", username);
    formData.append("j_password", password);

    return this.http.post(environment.apiUrl + '/j_security_check', formData, emptyHttpOptions);

  }

  /**
   * load the user groups from the back end, then save the data into the session storage
   * @param username 
   */
  loadUserData(username: string) : Observable<User> {
    // http://localhost:8080/system/userManager/user/segreteria.1.json
    return this.http.get<User>(`${environment.apiUrl}/system/userManager/user/${username}.1.json`);
  }

  loadDeviceName() : Observable<DeviceModel> {
    return this.http.get<DeviceModel>(`${environment.apiUrl}/endoone/machinename`);
  }

  loadSalaDevice(deviceName: string) : Observable<SalaModel> {
    return this.http.get<SalaModel>(`${environment.apiUrl}/configuration/endoone-devices/${deviceName}.json`);
  }

  //Metodo per il ritorno dell'informazione user.
  getUser(): User {
    return this.user;
  }

  //Metodo per il recupero dello username.
  /*getUsername() {
    // this.logger.log(logLevelModel.debug, AuthenticationService.name, "INIZIO - Recupero dello username.");
    let username: string = this.user.username;
    console.log(username);
    // this.logger.log(logLevelModel.debug, AuthenticationService.name, "FINE - Recupero dello username.");
    return username;
  }*/

  isInGroup(groupName, user: User = null): any {
    let bInGroup : Boolean;
    bInGroup = false;
    if (user == null)
    {
      user = this.getUser();
    }
    user.Groups.forEach(element => {
        if (element == groupName)
        {
          bInGroup= true;
        }
        
    });
    return bInGroup;
  }
  //Metodo per effettuare il logout.
  logout() {
    this.sessionStorage.clear("user");
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
