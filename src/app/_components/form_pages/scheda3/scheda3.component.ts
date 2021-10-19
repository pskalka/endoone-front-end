import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { GETService } from 'src/app/get.service';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { POSTService } from 'src/app/post.service';
import { UrlConstants } from 'src/app/_constants/url.constants';
import { JcrHelper } from 'src/app/_helpers/jcrhelper';
import { MultiSelectFieldNames } from 'src/app/_models/multi-select-field-names.enum';
import { SchedaSlingAttributeBean } from 'src/app/_models/SchedaSlingAttributeBean';
import swal from 'sweetalert2';

@Component({
  selector: 'app-scheda3',
  templateUrl: './scheda3.component.html',
  styleUrls: ['./scheda3.component.css']
})
export class Scheda3Component implements OnInit {
  doValidateRequiredFields: boolean = true;
  //requiredFieldNames: string[] = ["componentiEquipe", "verificaIdentita", "prescrizioni", "CVP", "farmaci", "strumento", "procedura_ora_inizio", "procedura_ora_fine", "decubito"];
  requiredFieldNames: string[] = ["procedura_ora_inizio", "procedura_ora_fine"];

  numeroProtocollo!: number;
  cognome!: string;
  data_visita!: Date;

  indagini_ddl_items: string[] = ["Sonda rettale", "Complicanze", "Altro"];
  indagini_chk_items: string[] = ["Argon", "Polipectomia", "Legatura varici", "Biopsie endoscopiche", "Emostasi"];
  indagini_di_laboratorio_smartlist_name = "indagini_di_laboratorio";

  componentiEquipe!: boolean;
  lblUrgenza!: string;
  tipologia!: string;
  urgenza!: boolean;
  nome!: string;
  esame_motivo!: string;
  verificaIdentita!: boolean;
  n_boccetti!: number;
  note_3!: string;
  note_3_timeout!: string;
  prescrizioni!: boolean;
  procedura_ora_inizio!: string;
  procedura_ora_fine!: string;
  CVP!: boolean;
  farmaci!: boolean;
  strumento!: boolean;
  decubito!: string;
  multiSelectFieldNames = MultiSelectFieldNames;
  monitoraggioPaùrametriVitaliFieldName!: string;

  chkSedazione!: boolean;
  chkNarcosi!: boolean;
  procedura_ora_inizio_default!: string;
  procedura_ora_fine_default!: string;

  mprBaseColWidths: string[] = ["80"];
  mprDynamicColWidth: string = "40";

  trdBaseColWidths: string[] = ["80"];
  trdDynamicColWidth: string = "40";

  sedBaseColWidths: string[] = ["80"];
  sedDynamicColWidth: string = "40";
  selezione_sala_value!: string;


  constructor(
    public serviceGET: GETService,
    private postService: POSTService,
    private route: ActivatedRoute,
    private router: Router) {
    // this.monitoraggioParametriVitaliFieldName = this.multiSelectFieldNames.MONITORAGGIO_PARAMETRI_VITALI;
    //****** */
  }

  ngOnInit(): void {
    /* this.serviceGET.getSmartlist("decubito").subscribe(res =>{ 
       this.decubito.label = res.responseBody["jcr:description"];
       this.decubito.radiovalues = [
         {value:'supino',viewValue:'Supino'},
         {value:'lateraleSx',viewValue:'Laterale sinistro'}
       ];
     });*/

    this.serviceGET.getWorkingData().subscribe(d => {
      console.log(JSON.stringify(d));

      this.componentiEquipe = JcrHelper.getJcrBooleanValue(d, "componentiEquipe");
      this.CVP = JcrHelper.getJcrBooleanValue(d, "CVP");
      this.farmaci = JcrHelper.getJcrBooleanValue(d, "farmaci");
      this.prescrizioni = JcrHelper.getJcrBooleanValue(d, "prescrizioni");
      this.strumento = JcrHelper.getJcrBooleanValue(d, "strumento");
      this.verificaIdentita = JcrHelper.getJcrBooleanValue(d, "verificaIdentita");

      this.data_visita = JcrHelper.getJcrDateValue(d, "data_visita");
      this.decubito = JcrHelper.getJcrStringValue(d, "decubito");
      this.procedura_ora_fine = JcrHelper.getJcrStringValue(d, "procedura_ora_fine");
      this.procedura_ora_inizio = JcrHelper.getJcrStringValue(d, "procedura_ora_inizio");
      this.cognome = JcrHelper.getJcrStringValue(d, "cognome");
      this.esame_motivo = JcrHelper.getJcrStringValue(d, "esame_motivo");
      this.n_boccetti = JcrHelper.getJcrNumberValue(d, "n_boccetti");
      this.nome = JcrHelper.getJcrStringValue(d, "nome");
      this.note_3 = JcrHelper.getJcrStringValue(d, "note_3");
      this.note_3_timeout = JcrHelper.getJcrStringValue(d, "note_3_timeout");
      this.tipologia = JcrHelper.getJcrStringValue(d, "tipologia");
      this.urgenza = JcrHelper.getJcrBooleanValue(d, "urgenza");

      this.chkSedazione = JcrHelper.getJcrBooleanValue(d, "chk_sedazione");
      this.chkNarcosi = JcrHelper.getJcrBooleanValue(d, "chk_narcosi");
      this.lblUrgenza = this.urgenza ? "Urgenza" : "";
      this.selezione_sala_value = JcrHelper.getJcrStringValue(d, "selezione_sala_value");
    });

    let _now: Moment;
    _now = moment(new Date(), "HH:mm");
    this.procedura_ora_inizio_default = _now.format("HH:mm");
    this.procedura_ora_fine_default = _now.format("HH:mm");
  }

  chiudiScheda() {
    this.router.navigate(['/home']);
  }

  isDisable() {
    return true;
    // return this.disableService.checkItem("terza-form");
  }

  onTimeChange($event: any): void {
    console.log(JSON.stringify($event.srcElement));
    this.postAttribute($event.srcElement.name, $event.srcElement.value);
    if ("procedura_ora_inizio".localeCompare($event.srcElement.name) == 0) {
      this.procedura_ora_inizio = $event.srcElement.value;
    } else if ("procedura_ora_fine".localeCompare($event.srcElement.name) == 0) {
      this.procedura_ora_fine = $event.srcElement.value;
    }
  }

  postAttribute(fieldId: string, fieldValue: string) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldId, fieldValue, "String", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

  txtNBoccettiOnChange() {
    console.log(this.n_boccetti);
    this.postAttribute("n_boccetti", `${this.n_boccetti}`);
  }

  chkChange(fieldName: string, fieldValue: boolean): void {
    console.log(`${fieldName}=${fieldValue}`);
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldName, fieldValue, "Boolean", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

  validate(): string[] {
    let errorMessages: string[] = [];
    if (
      (this.isRequired('componentiEquipe') && (this.componentiEquipe === null || this.componentiEquipe === undefined || !this.componentiEquipe))
      || (this.isRequired('verificaIdentita') && ((this.verificaIdentita === null || this.verificaIdentita === undefined) || !this.verificaIdentita))
      || (this.isRequired('prescrizioni') && ((this.prescrizioni === null || this.prescrizioni === undefined) || !this.prescrizioni))
      || (this.isRequired('CVP') && ((this.CVP === null || this.CVP === undefined) || !this.CVP))
      || (this.isRequired('farmaci') && ((this.farmaci === null || this.farmaci === undefined) || !this.farmaci))
      || (this.isRequired('strumento') && ((this.strumento === null || this.strumento === undefined) || !this.strumento))
    ) {
      errorMessages.push("Valorizzare tutti i controlli Time-out Pre-procedura");
    }
    if (this.isRequired('procedura_ora_inizio') && ((this.procedura_ora_inizio === null || this.procedura_ora_inizio === undefined) || this.procedura_ora_inizio == '')) {
      errorMessages.push("Valorizzare l'ora di inizio della procedura");
    }
    if (this.isRequired('procedura_ora_fine') && ((this.procedura_ora_fine === null || this.procedura_ora_fine === undefined) || this.procedura_ora_fine == '')) {
      errorMessages.push("Valorizzare l'ora di fine della procedura");
    }
    if (this.isRequired('decubito') && ((this.decubito === null || this.decubito === undefined) || this.decubito == '')) {
      errorMessages.push("Valorizzare il decubito");
    }

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
          this.router.navigate([UrlConstants._4_POST_PROCEDURA]);
        } else {
          swal.fire("Attenzione", errorMessages.join('<br/>'), "error");
          //alert(errorMessages.join('\n'))
        }
        return;
      case NavbarComponent.REQUEST_PREVIOUS:
        this.router.navigate([UrlConstants._2_PRE_PROCEDURA]);
        return;
    }
  }

  chkSedazioneChange(mcc: MatCheckboxChange) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean("chk_sedazione", mcc.checked, "Boolean", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
    console.log(JSON.stringify(mcc.checked));
  }

  chkNarcosiChange(mcc: MatCheckboxChange) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean("chk_narcosi", mcc.checked, "Boolean", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
    console.log(JSON.stringify(mcc.checked));
  }

  oraInizioFocusOut($event: any) {
    console.log($event);
    this.postAttribute("procedura_ora_inizio", $event.srcElement.value);
  }

  oraFineFocusOut($event: any) {
    console.log($event);
    this.postAttribute("procedura_ora_fine", $event.srcElement.value);
  }

}
