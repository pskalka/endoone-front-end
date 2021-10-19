import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GenerateSecretService } from '../generate-secret.service';
import { User } from '../_models';


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
    // private customCookieService: CustomCookieService,
    private sessionStorage: SessionStorageService) {

    // this.userSubject = new BehaviorSubject<User>(customCookieService.getUser());
    // this.userLoginResponse = this.userSubject.asObservable();
  }

  // public get userValue(): User {
  //   return this.userSubject.value;
  // }

  //Metodo di login.
  login(username: string, password: string) : Observable<any> {
    // this.logger.log(logLevelModel.debug, AuthenticationService.name, "INIZIO - Chiamata per il login.");
    let secret = this.generateSecretService.createSecret();
    let httpOptions = {

      // headers: new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   // 'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      //   'authentication_validate': secret
      // })
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
  setUser(username: string) : void {
    // http://localhost:8080/system/userManager/user/segreteria.1.json
    this.http.get<User>(`${environment.apiUrl}/system/userManager/user/${username}.1.json`).subscribe(
      (user) => {
        user.username = username;
        user.id = user.path.replace("/home/users/endoone-login/", "");
        user.Groups = [];
        user.memberOf.forEach (function(value) {
          user.Groups.push(value.replace("/system/userManager/group/", ""));
        });
        this.sessionStorage.store("user", user);
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.log("setUser complete");
      });
  }

  //Metodo per il ritorno dell'informazione user.
  getUser(): User {
    return this.user;
  }

  //Metodo per il recupero dello username.
  getUsername() {
    // this.logger.log(logLevelModel.debug, AuthenticationService.name, "INIZIO - Recupero dello username.");
    let username: string = this.user.username;
    console.log(username);
    // this.logger.log(logLevelModel.debug, AuthenticationService.name, "FINE - Recupero dello username.");
    return username;
  }
  //Metodo per effettuare il logout.
  logout() {
    // this.logger.log(logLevelModel.debug, AuthenticationService.name, "INIZIO - Logout.")
    // this.customCookieService.delete('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
    // this.logger.log(logLevelModel.debug, AuthenticationService.name, "FINE - Logout.")
  }
}
