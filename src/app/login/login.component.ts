import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
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
    private authenticationService: AuthenticationService) {
      // if (this.authenticationService.userValue) {
      //   this.router.navigate(['/']);
      // }

   }

  //Metodo per l'inizializzazione del componente, si crea la Form e si imposta l'URL.
  ngOnInit(): void {
    // this.logger.log(logLevelModel.debug, LoginComponent.name, "INIZIO - Inizializzazione del componente.");
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
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
          this.authenticationService.setUser(this.f.username.value);
          this.router.navigate(["home"]);
        }
      }
    );
  }

}
