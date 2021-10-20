import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../_services';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = "home";
  error = '';

  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sessionStorage: SessionStorageService) {
   }

  //Metodo per l'inizializzazione del componente, si crea la Form e si imposta l'URL.
  ngOnInit(): void {
    // this.logger.log(logLevelModel.debug, LoginComponent.name, "INIZIO - Inizializzazione del componente.");
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      error: new FormControl('')
    })
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // this.logger.log(logLevelModel.debug, LoginComponent.name, "FINE - Inizializzazione del componente.");
  }
  //Funzione per la creazione dinamica della Form.
  get f() {
    // this.logger.log(logLevelModel.debug, LoginComponent.name, "INIZIO - Creazione dinamica della Form.");
    // this.logger.log(logLevelModel.debug, LoginComponent.name, "FINE - Creazione dinamica della Form.");
    return this.loginForm.controls;
  }


  //Metodo dell'invio dei dati della Form.
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    // the call to this.authenticationService.login will always land to (error) because the http status is different from 200
    let result = this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(
      (data) => {},
      (error) => {
        if ("OK" == error) {
            this.authenticationService.loadUserData(this.f.username.value).subscribe(
            (user) => {
              user.username = this.f.username.value;
              user.id = user.path.replace("/home/users/endoone-login/", "");
              user.Groups = [];
              user.memberOf.forEach (function(value) {
                user.Groups.push(value.replace("/system/userManager/group/", ""));
              });
              //Recupero Nome macchina da ip client
              let device = this.authenticationService.loadDeviceName().subscribe(
                res  => {
                  user.deviceName = res.device;
                      //Recupero sala da nome macchina
                      if (!this.authenticationService.isInGroup(environment.gruppoendoAdmin, user))
                      {
                        let sala = this.authenticationService.loadSalaDevice(user.deviceName).subscribe(
                          ressala  => {
                            user.sala = ressala.ambulatorio;
                            this.sessionStorage.store("user", user);
                            this.router.navigate(["home"]);
                          }, 
                          (error) => {
                            this.f.error.setValue("Sala non configurata per il device.");
                          },
                          () => {
                              console.log();
                          }
                        )
                      } else {
                        this.sessionStorage.store("user", user);
                        this.router.navigate(["home"]);
                      }
                  //this.sessionStorage.store("user", user);
                  //this.router.navigate(["home"]);
                }, 
                (error) => {console.error(error);
                  this.f.error.setValue("Invalid Device name");
                },
                () => {
                    console.log();
                }
              )
            },
            (error) => {
              console.error(error);
              this.f.error.setValue("Invalid user or password");
            },
            () => {
              console.log("setUser complete");
            });
          
        } else {
          console.error(error);
          this.f.error.setValue("Invalid user or password");
        }
      }
    );
  }

}
