import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../_services';
import { User } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { ProtocolService } from '../protocol.service';
// import { NavbarNavigation } from '../navbar-navigation';
// import { NavbarNavigationService } from '../navbar-navigation.service';
import { environment } from 'src/environments/environment';
import { UrlConstants } from '../_constants/url.constants';
import { GETService } from '../get.service';
import { POSTService } from '../post.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SchedaSlingAttributeBean } from '../_models/SchedaSlingAttributeBean';
import { SchedaCleanerService } from '../_services/scheda-cleaner.service';
import { MatDialog } from '@angular/material/dialog';
import { ClearSchedaDialogComponent } from '../_dialogs/clear-scheda-dialog/clear-scheda-dialog.component';
import { JcrHelper } from '../_helpers/jcrhelper';
import { Observable } from 'rxjs/internal/Observable';
import { SessionStorage, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  cognome!: string;
  nome!: string;

  public static readonly REQUEST_STOP: string = "stop";
  public static readonly REQUEST_PAUSE: string = "pause";
  public static readonly REQUEST_NEXT: string = "next";
  public static readonly REQUEST_PREVIOUS: string = "previous";

  currentPage!: number;
  currentUser!: User;
  image_navbar!: string;
  image_stop!: string;
  image_pause!: string;
  image_next!: string;
  image_previous!: string;
  next!: string;
  previous!: string;
  currentPhase!: string;
  bShowMotivationMessage!: boolean;
  sTitoloMessaggioPopUp!: string;

  @Input()
  protocolNumber!: string;
  @Input()
  cardPath!: string;

  @Input()
  page_header!: string;
  @Input()
  previous_text!: string;
  @Input()
  next_text!: string;

  @Input()
  can_go_back!: boolean;
  @Input()
  can_go_forward!: boolean;

  @Output() nav_requested = new EventEmitter<string>();

  username!: string;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private authenticationService: AuthenticationService,
    private protocolService: ProtocolService,
    public serviceGET: GETService,
    private postService: POSTService,
    private sanitizer: DomSanitizer,
    private schedaCleanerService: SchedaCleanerService,
    public dialog: MatDialog
    // private sessionStorage: SessionStorageService
  ) {
    // router.events.subscribe((val) => this.checkAll());
  }

  ngOnInit() {
    this.image_navbar = this.getImageNavbar("logo");
    this.image_next = this.getImageNavbar("next");
    this.image_previous = this.getImageNavbar("previous");
    this.image_pause = this.getImageNavbar("pause");
    this.image_stop = this.getImageNavbar("stop");
    this.bShowMotivationMessage = false;
    this.sTitoloMessaggioPopUp = "Chiusura Scheda:";

    this.username = this.authenticationService.getUsername();
  }

  getImageNavbar(nameImage: string) {
    return environment.apiUrl + `/content/next-forms/img/schedaInf/${nameImage}.png`;
    //
    return `http://next2u.myddns.com:8080/content/next-forms/img/schedaInf/${nameImage}.png`;
  }
  getUrl() {
    return this.router.url;
  }

  getNominativo(): string {
    // now avoid showing a "null null" message
    let c: string = this.cognome;
    if (c === null || c === undefined) {
      c = "";
    }
    let n: string = this.nome;
    if (n === null || n === undefined) {
      n = "";
    }
    return `${c} ${n}`;
  }

  onStopClick(): void {
    this.serviceGET.getWorkingData().subscribe(d => {
      this.cognome = JcrHelper.getJcrStringValue(d, "cognome");
      this.nome = JcrHelper.getJcrStringValue(d, "nome");
      this.bShowMotivationMessage= true;
      this.sTitoloMessaggioPopUp = "Chiusura Forzata scheda:"
      this.postAttribute("stato_chiusura", "C");
      this.openClearSchedaDialog();

    });
  }

  postAttribute(fieldId: string, fieldValue: string) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldId, fieldValue, "String", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

  openClearSchedaDialog(): void {
    const dialogRef = this.dialog.open(ClearSchedaDialogComponent, {
      width: '50%',
      data: {
        title: this.sTitoloMessaggioPopUp + " " + this.getNominativo(),
        showApri: false,
        showCloseMotivation: this.bShowMotivationMessage
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog chiusa con comando: ${result}`);
      if ('apri'.localeCompare(result) == 0) {
        this.serviceGET.getWorkingData().subscribe(d => {
          this.postService.postWithData(d, `/${environment.printPostUrl}`).subscribe(
            // this.serviceGET.getWithData(d, `/${environment.printPostUrl}`).subscribe(
            (response: any) => {
              let file = new Blob([response], { type: 'application/pdf' });
              var fileURL = URL.createObjectURL(file);
              let x = this.sanitizer.bypassSecurityTrustUrl(fileURL);
              window.open(fileURL);
            },
            (error : any) => {
              console.log(error);
            }
          );
        }, error => {
          console.log(error);
        });
      } else if ('pulisci'.localeCompare(result) == 0) {
        this.serviceGET.getWorkingData().subscribe(d => {
          this.schedaCleanerService.cleanScheda(d).subscribe(_ => {
            this.router.navigate([UrlConstants._0_HOME]);
          });
        });
      }
    })
  }


  // checkAll() {
  //   this.getNextText;
  //   this.getPreviousText;
  //   this.checkNext;
  //   this.checkPrevious;
  //   this.getPhase;
  // }

  // pageUrls: string[] = [UrlConstants._1_ACCOGLIENZA, UrlConstants._2_PRE_PROCEDURA, UrlConstants._3_INTRA_PROCEDURA, UrlConstants._4_POST_PROCEDURA];

  goToNextPage() {
    this.nav_requested.emit('next');
    // let page: string = this.router.url;
    // switch (page) {
    //   case UrlConstants._1_ACCOGLIENZA:
    //     this.router.navigate([UrlConstants._2_PRE_PROCEDURA]);
    //     break;
    //   case UrlConstants._2_PRE_PROCEDURA:
    //     this.router.navigate([UrlConstants._3_INTRA_PROCEDURA]);
    //     break;
    //   case UrlConstants._3_INTRA_PROCEDURA:
    //     this.router.navigate([UrlConstants._4_POST_PROCEDURA]);
    //     break;
    //   case UrlConstants._4_POST_PROCEDURA:
    //     this.serviceGET.getWorkingData().subscribe(d => {
    //       this.serviceGET.getWithData(d, `/${environment.printPostUrl}`).subscribe(
    //           (response) => {
    //             let file = new Blob([response], { type: 'application/pdf' });
    //             var fileURL = URL.createObjectURL(file);
    //             let x = this.sanitizer.bypassSecurityTrustUrl(fileURL);

    //             window.open(fileURL);

    //             this.schedaCleanerService.cleanScheda();

    //             this.router.navigate([UrlConstants._0_HOME]);
    //           },
    //           (error) => {
    //             console.log(error);
    //           }
    //         );
    //     }, error => {
    //       console.log(error);
    //     });
    //     // this.router.navigate([UrlConstants._0_HOME]);
    //     break;
    // }
  }

  goToPreviousPage() {
    this.nav_requested.emit('previous');
    // let page: string = this.router.url;
    // switch (page) {
    //   case UrlConstants._2_PRE_PROCEDURA:
    //     this.router.navigate([UrlConstants._1_ACCOGLIENZA]);
    //     break;
    //   case UrlConstants._3_INTRA_PROCEDURA:
    //     this.router.navigate([UrlConstants._2_PRE_PROCEDURA]);
    //     break;
    //   case UrlConstants._4_POST_PROCEDURA:
    //     this.router.navigate([UrlConstants._3_INTRA_PROCEDURA]);
    //     break;
    // }
  }

  // checkNext() {
  //   return true;
  // }

  // checkPrevious() {
  //   let page: string = this.router.url;
  //   // if(page  === '/seconda-form' || page === '/terza-form')
  //   if (page === UrlConstants._1_ACCOGLIENZA) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // getNextText() {
  //   let page: string = this.router.url;
  //   switch (page) {
  //     case UrlConstants._1_ACCOGLIENZA:
  //       return "Accoglienza Pre-Procedura 2/2";
  //     case UrlConstants._2_PRE_PROCEDURA:
  //       return "Intra-Procedura";
  //     case UrlConstants._3_INTRA_PROCEDURA:
  //       return "Post-Procedura";
  //     case UrlConstants._4_POST_PROCEDURA:
  //       return "Chiusura Scheda";
  //   }
  // }

  // getPreviousText() {
  //   let page: string = this.router.url;
  //   switch (page) {
  //     case UrlConstants._2_PRE_PROCEDURA:
  //       return "Accoglienza Pre-Procedura 1/2";
  //     case UrlConstants._3_INTRA_PROCEDURA:
  //       return "Accoglienza Pre-Procedura 2/2";
  //     case UrlConstants._4_POST_PROCEDURA:
  //       return "Intra-Procedura";
  //   }
  // }

  // getPhase() {
  //   let page: string = this.router.url;
  //   switch (page) {
  //     case UrlConstants._1_ACCOGLIENZA:
  //       return "Accoglienza e Pre-Procedura 1/2";
  //     case UrlConstants._2_PRE_PROCEDURA:
  //       return "Accoglienza e Pre-Procedura 2/2";
  //     case UrlConstants._3_INTRA_PROCEDURA:
  //       return "Intra-Procedura";
  //     case UrlConstants._4_POST_PROCEDURA:
  //       return "Post-Procedura";
  //   }
  // }

  // setInputToDisable(pageToDisable: string) {
  //   //this.disableService.saveInSession(pageToDisable, "true");
  // }

}