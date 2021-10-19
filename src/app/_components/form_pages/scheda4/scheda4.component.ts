import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { GETService } from 'src/app/get.service';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { POSTService } from 'src/app/post.service';
import { UrlConstants } from 'src/app/_constants/url.constants';
import { ClearSchedaDialogComponent } from 'src/app/_dialogs/clear-scheda-dialog/clear-scheda-dialog.component';
import { JcrHelper } from 'src/app/_helpers/jcrhelper';
import { MultiSelectFieldNames } from 'src/app/_models/multi-select-field-names.enum';
import { SchedaSlingAttributeBean } from 'src/app/_models/SchedaSlingAttributeBean';
import { SchedaCleanerService } from 'src/app/_services/scheda-cleaner.service';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-scheda4',
  templateUrl: './scheda4.component.html',
  styleUrls: ['./scheda4.component.css']
})
export class Scheda4Component implements OnInit {
  doValidateRequiredFields: boolean = true;
  //requiredFieldNames: string[] = ["valutazione_dolore_nrs_value_4", "stato_respiratorio_4", "o2_terapia_l_min_4", "educazione_post_procedura", "raccomandazioni_post_sedazione", "stato_coscienza_4", "deambulazione_4", "ora_dimissione", "dimissione"];
  requiredFieldNames: string[] = ["ora_dimissione"];

  canGoForward: boolean = true;

  labelStatoCos: string = "Stato coscienza";
  smartlistNameStatoCos: string = "stato_coscienza_4";

  labelDeambulazione: string = "Deambulazione";
  smartlistNameDeambulazione: string = "deambulazione_4";

  labelDimissione: string = "Dimissione";
  smartlistNameDimissione: string = "dimissione";

  cognome!: string;
  data_visita!: Date;
  deambulazione_4!: string;
  dimissione!: string;
  educazione_post_procedura!: boolean;
  effetti_personali!: string[];
  effetti_personali_riconsegnati!: boolean;
  esame_motivo!: string;
  nome!: string;
  note_4!: string;
  numeroProtocollo!: string;
  o2_terapia_l_min_4!: number;
  procedura_ora_inizio!: string;
  procedura_ora_fine!: string;
  raccomandazioni_post_sedazione!: boolean;
  stato_coscienza_4!: string;
  stato_respiratorio_4!: string;
  tipologia!: string;
  urgenza!: boolean;
  urgenza_label!: string;
  valutazione_dolore_nrs_value_4!: string;
  valutazione_dolore_nrs_intervento_4!: string;

  fc_data_visita = new FormControl(new Date());

  multiSelectFieldNames = MultiSelectFieldNames;

  ora_dimissione!: string;

  ora_dimissione_default!: string;
  selezione_sala_value!: string;

  bPresenzaEffettiPersonali: boolean = true;

  constructor(
    public serviceGET: GETService,
    private postService: POSTService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private schedaCleanerService: SchedaCleanerService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.data_visita = new Date();

    this.serviceGET.getWorkingData().subscribe(d => {
      this.cognome = JcrHelper.getJcrStringValue(d, "cognome");
      this.data_visita = JcrHelper.getJcrDateValue(d, "data_visita");
      this.educazione_post_procedura = JcrHelper.getJcrBooleanValue(d, "educazione_post_procedura");
      this.effetti_personali = JcrHelper.getJcrStringArrayValue(d, "effetti_personali");
      this.effetti_personali_riconsegnati = JcrHelper.getJcrBooleanValue(d, "effetti_personali_riconsegnati");
      this.esame_motivo = JcrHelper.getJcrStringValue(d, "esame_motivo");
      this.nome = JcrHelper.getJcrStringValue(d, "nome");
      this.note_4 = JcrHelper.getJcrStringValue(d, "note_4");
      this.o2_terapia_l_min_4 = JcrHelper.getJcrNumberValue(d, "o2_terapia_l_min_4");
      this.ora_dimissione = JcrHelper.getJcrStringValue(d, "ora_dimissione");
      this.procedura_ora_fine = JcrHelper.getJcrStringValue(d, "procedura_ora_fine");
      this.procedura_ora_inizio = JcrHelper.getJcrStringValue(d, "procedura_ora_inizio");
      this.fc_data_visita.setValue(this.data_visita);
      this.raccomandazioni_post_sedazione = JcrHelper.getJcrBooleanValue(d, "raccomandazioni_post_sedazione");
      this.stato_coscienza_4 = JcrHelper.getJcrStringValue(d, "stato_coscienza_4");
      this.stato_respiratorio_4 = JcrHelper.getJcrStringValue(d, "stato_respiratorio_4");
      this.deambulazione_4 = JcrHelper.getJcrStringValue(d, "deambulazione_4");
      this.dimissione = JcrHelper.getJcrStringValue(d, "dimissione");
      this.tipologia = JcrHelper.getJcrStringValue(d, "tipologia");
      this.urgenza = JcrHelper.getJcrBooleanValue(d, "urgenza");
      this.urgenza_label = this.urgenza ? "Urgenza" : "";
      this.valutazione_dolore_nrs_value_4 = JcrHelper.getJcrStringValue(d, "valutazione_dolore_nrs_value_4");
      this.valutazione_dolore_nrs_intervento_4 = JcrHelper.getJcrStringValue(d, "valutazione_dolore_nrs_intervento_4");
      this.selezione_sala_value = JcrHelper.getJcrStringValue(d, "selezione_sala_value");
      let _now: Moment;
      _now = moment(new Date(), "HH:mm");
      this.ora_dimissione_default = _now.format("HH:mm");
      console.log(this.ora_dimissione_default);
      if (this.effetti_personali === null || this.effetti_personali === undefined) {
        this.bPresenzaEffettiPersonali = false;
      } else {
        if (this.effetti_personali.length === 0 || this.effetti_personali[0] == ''){
          this.bPresenzaEffettiPersonali = false;
        }
      }
    }, error => {
      console.error(error);
    });

  }

  onTimeChange($event : any): void {
    console.log(JSON.stringify($event.srcElement));
    this.postAttribute($event.srcElement.name, $event.srcElement.value);
  }

  postAttribute(fieldId: string, fieldValue: string) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldId, fieldValue, "String", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

  onChangeRf($event : any) {
    console.log($event);
    let fieldName: string = $event.source.name;
    let fieldvalue: string = $event.source.value;
    this.postAttribute(fieldName, fieldvalue);
    switch (fieldName) {
      case "stato_respiratorio_4":
        this.stato_respiratorio_4 = fieldvalue;
    }
  }

  txtO2TerapiaOnChange() {
    console.log(this.o2_terapia_l_min_4);
    this.postAttribute("o2_terapia_l_min_4", `${this.o2_terapia_l_min_4}`);
  }

  validate(): string[] {
    let errorMessages: string[] = [];
    if (this.isRequired('valutazione_dolore_nrs_value_4') && (this.valutazione_dolore_nrs_value_4 === null || this.valutazione_dolore_nrs_value_4 === undefined || this.valutazione_dolore_nrs_value_4 == '')) {
      errorMessages.push("Valorizzare la valutazione del dolore NRS");
    }/* else {
      if (!this.valutazione_dolore_nrs_value_4.startsWith("0") &&
        (isNullOrUndefined(this.valutazione_dolore_nrs_intervento_4) || this.valutazione_dolore_nrs_intervento_4 == '')) {
        errorMessages.push("In presenza di dolore, Valorizzare l'intervento effettuato");
        }
    }*/
    if (this.isRequired('stato_respiratorio_4') && (this.stato_respiratorio_4 === null || this.stato_respiratorio_4 || this.stato_respiratorio_4 == '')) {
      errorMessages.push("Valorizzare lo stato respiratorio");
    }
    if (this.isRequired('o2_terapia_l_min_4') && (this.o2_terapia_l_min_4 === null || this.o2_terapia_l_min_4)) {
      errorMessages.push("Valorizzare l'ossigenoterapia (L/min)");
    }
    if (this.isRequired('educazione_post_procedura') && (this.educazione_post_procedura === null || this.educazione_post_procedura || !this.educazione_post_procedura)) {
      errorMessages.push("Valorizzare l'educazione post-procedura");
    }
    if (this.isRequired('raccomandazioni_post_sedazione') && (this.raccomandazioni_post_sedazione === null || this.raccomandazioni_post_sedazione || !this.raccomandazioni_post_sedazione)) {
      errorMessages.push("Valorizzare le raccomandazioni post-sedazione");
    }
    if (this.isRequired('stato_coscienza_4') && (this.stato_coscienza_4 === null || this.stato_coscienza_4 || this.stato_coscienza_4 == '')) {
      errorMessages.push("Valorizzare lo stato coscienza");
    }
    if (this.isRequired('deambulazione_4') && (this.deambulazione_4 === null || this.deambulazione_4 || this.deambulazione_4 == '')) {
      errorMessages.push("Valorizzare la deambulazione");
    }
    if (this.isRequired('ora_dimissione') && (this.ora_dimissione === null || this.ora_dimissione || this.ora_dimissione == '')) {
      errorMessages.push("Valorizzare l'ora dimissione");
    }
    if (this.isRequired('dimissione') && (this.dimissione === null || this.dimissione || this.dimissione == '')) {
      errorMessages.push("Valorizzare la dimissione");
    }
    // if (isNullOrUndefined(this.nome) || this.nome == '') {
    //   errorMessages.push("Inserire il nome");
    // }
    // if (isNullOrUndefined(this.data_di_nascita) || this.data_di_nascita == '') {
    //   errorMessages.push("Inserire la data di nascita");
    // }

    return errorMessages;
  }

  isRequired(field: string) {
    return this.doValidateRequiredFields && this.requiredFieldNames.includes(field);
  }

  nav_requested($event: string): void {
    switch ($event) {
      case NavbarComponent.REQUEST_NEXT:
        var errorMessages = this.validate();

        if (errorMessages.length < 1) {
          this.canGoForward = false;
          this.openClearSchedaDialog();
        } else {
          swal.fire("Attenzione",errorMessages.join('<br/>'), "error");
          //alert(errorMessages.join('\n'))
        }
        return;
      case NavbarComponent.REQUEST_PREVIOUS:
        this.router.navigate([UrlConstants._3_INTRA_PROCEDURA]);
        return;
    }
  }

  vdnrsChanged($event: any) {
    this.valutazione_dolore_nrs_value_4 = $event;
  }

  vdnrsInterventoChanged($event: any) {
    this.valutazione_dolore_nrs_intervento_4 = $event.srcElement.value;
    this.postAttribute("valutazione_dolore_nrs_intervento_4", this.valutazione_dolore_nrs_intervento_4);
  }

  oraDimissioneFocusOut($event: any) {
    console.log($event);
    this.postAttribute("ora_dimissione", $event.srcElement.value);
  }

  openClearSchedaDialog(): void {
    const dialogRef = this.dialog.open(ClearSchedaDialogComponent, {
      width: '50%',
      data: {
        title: `Chiusura della scheda ${this.getNominativo()}`,
        showApri: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.canGoForward = true;
      console.log(`Dialog chiusa con comando: ${result}`);
      if ('apri'.localeCompare(result) == 0) {
        this.serviceGET.getWorkingData().subscribe(d => {
          this.postService.postWithData(d, `/${environment.printPostUrl}`).subscribe(
            // this.serviceGET.getWithData(d, `/${environment.printPostUrl}`).subscribe(
            (response : any) => {
              let file = new Blob([response], { type: 'application/pdf' });
              var fileURL = URL.createObjectURL(file);
              let x = this.sanitizer.bypassSecurityTrustUrl(fileURL);
              window.open(fileURL);
            },
            (error: any) => {
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

}
