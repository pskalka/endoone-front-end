import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { GETService } from 'src/app/get.service';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { POSTService } from 'src/app/post.service';
import { ProtocolService } from 'src/app/protocol.service';
import { UrlConstants } from 'src/app/_constants/url.constants';
import { FormSignDialogComponent } from 'src/app/_dialogs/form-sign-dialog/form-sign-dialog.component';
import { JcrHelper } from 'src/app/_helpers/jcrhelper';
import { DatiInformativiTemplate } from 'src/app/_models/DatiInformativiTemplate';
import { Protocol } from 'src/app/_models/protocol';
import { RequiredSign } from 'src/app/_models/required-sign';
import { SchedaSlingAttributeBean } from 'src/app/_models/SchedaSlingAttributeBean';
import { ValutazioneDoloreTemplate } from 'src/app/_models/ValutazioneDoloreTemplate';
import swal from 'sweetalert2';
import { SingleSelectControlComponent } from '../../form_controls/single-select-control/single-select-control.component';

@Component({
  selector: 'app-scheda1',
  templateUrl: './scheda1.component.html',
  styleUrls: ['./scheda1.component.css']
})
export class Scheda1Component implements OnInit {
  doValidateRequiredFields: boolean = true;
  //requiredFieldNames: string[] = ["data_visita", "cognome", "nome", "data_di_nascita", "provenienza", "modalita_arrivo"];
  requiredFieldNames: string[] = ["data_visita", "cognome", "nome", "data_di_nascita"];

  dati_informativi_base_smartlistName: string = "dati_informativi_base";

  // effetti_personali_ddl_items: string[] = ["altro", "no"];
  // effetti_personali_chk_items: string[] = ["protesi_dentaria", "protesi_acustica", "occhiali"];

  effettiPersonaliSmartlistName = "effetti_personali";

  urgenzaLabel: string = "Urgenza";
  urgenzaFieldName: string = "urgenza";

  anagrafica: string = "Dati Anagrafici";

  labelTipologia: string = "Tipologia";
  smartlistNameTipologia: string = "tipologia";

  labelModArrivo: string = "Modalità arrivo";
  smartlistNameModArrivo: string = "modalita_arrivo";

  // effettiPersonali:EffettiPersonaliTemplate;
  labelEffettiPersonali: string = "Effetti personali";
  smartlistNameEffettiPersonali: string = "effetti_personali";

  labelDeficit: string = "Deficit";
  smartlistNameDeficit: string = "deficit";
  deficitSmartlistName: string = "deficit";

  // provenienza:FormSingleSelectTemplate;
  labelProvenienza: string = "Provenienza";
  smartlistNameProvenienza: string = "provenienza";
  labelProvenienza_2: string = "Provenienza 2";
  smartlistNameProvenienza_2: string = "provenienza_2";

  labelStatoCos: string = "Stato coscienza";
  smartlistNameStatoCos: string = "stato_coscienza";

  labelDeambulazione: string = "Deambulazione";
  smartlistNameDeambulazione: string = "deambulazione";

  // anagrafica:AnagraficaTemplate;
  datiInformativi: DatiInformativiTemplate;

  labelPortatore: string = "Portatore";
  smartlistNamePortatore: string = "portatore";

  valutazioneDolore: ValutazioneDoloreTemplate;
  date!: Date;
  generalTemplate: any;

  allattamento!: boolean;
  cognome!: string;
  data_di_nascita!: string;
  data_visita!: Date;
  dati_informativi_base_note!: string;
  dati_informativi_base!: string[];
  deambulazione!: string;
  deficit!: string;
  digiuno!: boolean;
  effetti_personali!: string[];
  effetti_personali_consegnati_a!: string;
  effetti_personali_text!: string;
  gravidanza!: boolean;
  lingua_italiana!: boolean;
  modalita_arrivo!: string;
  nome!: string;
  note_1!: string;
  portatore!: string;
  presenza_accompagnatore!: boolean;
  provenienza!: string;
  provenienza_2!: string;
  stato_coscienza!: string;
  tipologia!: string;
  triage_covid_note!: string;
  triage_covid_scheda_triage!: boolean;
  triage_covid_vaccinazione!: boolean;
  triage_covid_tampone!: boolean;

  urgenza!: boolean;

  protesi_acustica!: boolean;
  protesi_dentaria!: boolean;
  occhiali!: boolean;

  @Input()
  protocolNumberin!: string;
  // @Output() protocolNumberOut = new EventEmitter<string>();
  // @Output() protocolNumberOut = new EventEmitter<string>();
  protocol!: Protocol;
  saveData!: Map<string, string>;
  test: any;

  fc_data_visita = new FormControl(new Date());

  @ViewChildren(SingleSelectControlComponent)
  singleSelectControlChildren!: QueryList<SingleSelectControlComponent>;

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
  }

  private updateViewChildren() {
    setTimeout(() => {
      this.singleSelectControlChildren.forEach((child, index) => {
        console.log("updateViewChildren begin");
        child.detectChanges();
        console.log("updateViewChildren end");
      })
    }, 0);
  }

  constructor(
    public serviceGET: GETService,
    private postService: POSTService,
    private router: Router,
    private protocolService: ProtocolService,
    public dialog: MatDialog) {
    this.valutazioneDolore = new ValutazioneDoloreTemplate();
    this.valutazioneDolore.label = "Valutazione dolore NRS";
    this.valutazioneDolore.dropdownvalues = [
      { value: 'dvalore1', viewValue: 'dview1' },
      { value: 'dvalore2', viewValue: 'dview2' },
      { value: 'dvalore3', viewValue: 'dview3' }
    ];
    this.datiInformativi = new DatiInformativiTemplate();
    this.datiInformativi.label = "Dati Informativi"

    moment.locale('it');
  }

  ngOnInit() {
    this.setProtocolNumber();

    this.saveData = new Map<string, string>();
    // this.InitialationTemplates();

    this.data_visita = new Date();

    this.serviceGET.getWorkingData().subscribe(d => {
      console.log(JSON.stringify(d));

      this.allattamento = JcrHelper.getJcrBooleanValue(d, "allattamento");
      this.cognome = JcrHelper.getJcrStringValue(d, "cognome");
      this.data_di_nascita = JcrHelper.getJcrStringValue(d, "data_di_nascita");
      this.data_visita = JcrHelper.getJcrDateValue(d, "data_visita");
      if (this.data_visita === null || this.data_visita === undefined) {
        let dateStr = this.formatDate_yyyyMMdd(this.data_visita);
        this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean("data_visita", dateStr, "Date", false, false, false))
          .subscribe(resp => {
            console.log(resp);
          },
            error => console.log(error)
          );
      }
      //this.dati_informativi_base = JcrHelper.getJcrStringArrayValue(d, "dati_informativi_base");
      this.dati_informativi_base_note = JcrHelper.getJcrStringValue(d, "dati_informativi_base_note");
      this.deambulazione = JcrHelper.getJcrStringValue(d, "deambulazione");
      this.deficit = JcrHelper.getJcrStringValue(d, "deficit");
      this.digiuno = JcrHelper.getJcrBooleanValue(d, "digiuno");
      this.effetti_personali_consegnati_a = JcrHelper.getJcrStringValue(d, "effetti_personali_consegnati_a");
      this.effetti_personali_text = JcrHelper.getJcrStringValue(d, "effetti_personali_text");
      this.gravidanza = JcrHelper.getJcrBooleanValue(d, "gravidanza");
      this.lingua_italiana = JcrHelper.getJcrBooleanValue(d, "lingua_italiana");
      this.modalita_arrivo = JcrHelper.getJcrStringValue(d, "modalita_arrivo");
      this.nome = JcrHelper.getJcrStringValue(d, "nome");
      this.note_1 = JcrHelper.getJcrStringValue(d, "note_1");
      this.portatore = JcrHelper.getJcrStringValue(d, "portatore");
      this.presenza_accompagnatore = JcrHelper.getJcrBooleanValue(d, "presenza_accompagnatore");
      this.provenienza = JcrHelper.getJcrStringValue(d, "provenienza");
      this.provenienza_2 = JcrHelper.getJcrStringValue(d, "provenienza_2");
      this.stato_coscienza = JcrHelper.getJcrStringValue(d, "stato_coscienza");
      this.tipologia = JcrHelper.getJcrStringValue(d, "tipologia");
      this.triage_covid_note = JcrHelper.getJcrStringValue(d, "triage_covid_note");
      this.triage_covid_scheda_triage = JcrHelper.getJcrBooleanValue(d, "triage_covid_scheda_triage");
      this.triage_covid_tampone = JcrHelper.getJcrBooleanValue(d, "triage_covid_tampone");
      this.triage_covid_vaccinazione = JcrHelper.getJcrBooleanValue(d, "triage_covid_vaccinazione");
      this.urgenza = JcrHelper.getJcrBooleanValue(d, "urgenza");

      this.effetti_personali = [];
      this.effetti_personali = JcrHelper.getJcrStringArrayValue(d, "effetti_personali");
      if (!(this.effetti_personali === null || this.effetti_personali === undefined)) {
        this.protesi_dentaria = this.effetti_personali.includes("protesi_dentaria");
        this.protesi_acustica = this.effetti_personali.includes("protesi_acustica");
        this.occhiali = this.effetti_personali.includes("occhiali");
      } else {
        this.protesi_dentaria = false;
        this.protesi_acustica = false;
        this.occhiali = false;
      }


      this.fc_data_visita.setValue(this.data_visita);

      // console.log(`allattamento: '${this.allattamento}'`);
      // console.log(`cognome: '${this.cognome}'`);
      // console.log(`data_di_nascita: '${this.data_di_nascita}'`);
      console.log(`data_visita: '${this.data_visita}'`);
      console.log(`fc_data_visita: '${this.fc_data_visita.value}'`);
      // console.log(`dati_informativi_base_note: '${this.dati_informativi_base_note}'`);
      // console.log(`deambulazione: '${this.deambulazione}'`);
      // console.log(`deficit: '${this.deficit}'`);
      // console.log(`effetti_personali: '${JSON.stringify(this.effetti_personali)}'`);
      // console.log(`nome: '${this.nome}'`);
      // console.log(`portatore: '${this.portatore}'`);
      // console.log(`provenienza: '${this.provenienza}'`);
      // console.log(`stato_coscienza: '${this.stato_coscienza}'`);
      // console.log(`tipologia: '${this.tipologia}'`);
      // console.log(`triage_covid_note: '${this.triage_covid_note}'`);
      // console.log(`urgenza: '${this.urgenza}'`);
      // console.log('*************************************');
    }, error => {
      console.error(error);
    });
  }

  // getJcrStringValue(items: SchedaSlingAttributeBean[], name: string): string {
  //   let item: SchedaSlingAttributeBean = items.find(s => s.name === name);
  //   if (item != null) {
  //     return `${item.value}`;
  //   } else {
  //     return null;
  //   }
  // }

  // getJcrBooleanValue(items: SchedaSlingAttributeBean[], name: string): boolean {
  //   let item: SchedaSlingAttributeBean = items.find(s => s.name === name);
  //   if (item != null) {
  //     return item.value;
  //   } else {
  //     return null;
  //   }
  // }

  setProtocolNumber() {
    try {
      this.protocol = new Protocol(this.serviceGET, this.postService);
      this.protocol.protocolNumber = "";
      // if (this.protocolNumberin === undefined || this.protocolNumberin.trim().length === 0) {
      //   // this.protocolNumber=this.protocolService.getProtocolNumber();
      //   this.protocol.getProtocolNumber();
      // } else {
      //   this.protocol.protocolNumber = this.protocolNumberin;
      // }
      // this.protocolNumberOut.emit(this.protocolNumber);
      // this.protocolNumberOut.emit(this.protocol);
    } catch (error) {
      console.error(error);
    }
  }

  // InitialationTemplates() {
  //   this.generalTemplate = JSON.parse(localStorage.getItem("template"));
  // }

  isDisable() {
    return true;
    // return this.disableService.checkItem("seconda-form");
  }

  // addSaveData(saveData: Map<string,string>){
  addSaveData(saveData: string) {
    // console.log("saveData: " + saveData);
    console.log("saveData: " + saveData);
    // for(let key of saveData.keys()){
    //   this.saveData.set(key, saveData.get(key));
    // }
    let fieldName = saveData.split(":")[0];
    let fieldValue = saveData.split(":")[1];
    this.saveData.set(fieldName, fieldValue);

  }
  onSubmit() {
    console.log("onSubmit() executed")
    for (let key of this.saveData.keys()) {
      console.log("key: " + key);
      console.log("value: " + this.saveData.get(key));

    }
  }

  txtDatiInformativiFocusOut() {
    console.log(this.dati_informativi_base_note);
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean("dati_informativi_base_note", this.dati_informativi_base_note, "String", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

  formatDate_yyyyMMdd(date: Date): string {
    if (date === null || date === undefined) {
      date = new Date();
    }

    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-') + " 00:00:00";
  }

  addEvent(type: string, fieldName: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    if (event.value) {
      let dateStr = this.formatDate_yyyyMMdd(event.value);
      this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldName, dateStr, "Date", false, false, false))
        .subscribe(resp => {
          console.log(resp);
        },
          error => console.log(error)
        );
    } else {
      console.error("MatDatepickerInputEvent.value is null");
    }
  }

  OnChangeRadioField($event: any) {
    console.log($event);
    let x = $event.source.value;
    this.postAttribute("effetti_personali_consegnati_a", x);
  }

  postAttribute(fieldId: string, fieldValue: string) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldId, fieldValue, "String", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

  validate(): string[] {
    let errorMessages: string[] = [];
    if (this.isRequired("data_visita") && (this.data_visita === null || this.data_visita === undefined)) {
      errorMessages.push("Valorizzare la data della visita");
    }
    if (this.isRequired("cognome") && (this.cognome === null || this.cognome === undefined || this.cognome == '')) {
      errorMessages.push("Valorizzare il cognome");
    }
    if (this.isRequired("nome") && (this.nome === null || this.nome === undefined || this.nome == '')) {
      errorMessages.push("Valorizzare il nome");
    }
    if (this.isRequired("data_di_nascita") && (this.data_di_nascita === null || this.data_di_nascita === undefined || this.data_di_nascita == '')) {
      errorMessages.push("Valorizzare la data di nascita");
    }
    if (!(this.data_di_nascita === null || this.data_di_nascita === undefined)) {
      moment.locale('it');
      let dataDiNascita: moment.Moment = moment(this.data_di_nascita, "DD/MM/Y", false);
      let dt = new Date(dataDiNascita.toString());
      if (isNaN(dt.getTime())) {
        errorMessages.push("La data di nascita inserita non è valida");
      }
    }
    /*  if (this.isRequired("provenienza") && (isNullOrUndefined(this.provenienza) || this.provenienza == '')) {
       errorMessages.push("Valorizzare la provenienza");
     }
     if (this.isRequired("modalita_arrivo") && (isNullOrUndefined(this.modalita_arrivo) || this.modalita_arrivo == '')) {
       errorMessages.push("Valorizzare la modalità di arrivo");
     } */

    return errorMessages;
  }

  isRequired(field: string) {
    return this.doValidateRequiredFields && this.requiredFieldNames.includes(field);
  }

  nav_requested($event: string): void {
    switch ($event) {
      case NavbarComponent.REQUEST_NEXT:
        let errorMessages = this.validate();

        if (errorMessages.length < 1) {

          // sign the form
          // https://github.com/sweetalert2/ngx-sweetalert2/issues/19
          // Q: "Is it possible to put some third part component inside sweetalert?""
          // A: "It's not possible yet, unfortunately. You can set pure HTML, but not an Angular template"
          this.dialog.open(FormSignDialogComponent, {
            data: [
              [1, new RequiredSign("Accettatore", ["endo-segreteria", "endo-infermiere"])],
              [2, new RequiredSign("Supervisore", ["endo-medico"])],
            ]
          });

          this.router.navigate([UrlConstants._2_PRE_PROCEDURA]);
        } else {
          swal.fire("Attenzione", errorMessages.join('<br/>'), "error");
          //swal("Scheda!", errorMessages.join(''), "error");
          //alert(errorMessages.join('\n'))
        }
        return;
    }
  }

  /*
        (cognomeChanged)="cognomeChanged($event)" (nomeChanged)="nomeChanged($event)" (data_di_nascitaChanged)="data_di_nascitaChanged($event)"

  */

  cognomeChanged($event: string) {
    this.cognome = $event;
  }

  nomeChanged($event: string) {
    this.nome = $event;
  }

  data_di_nascitaChanged($event: string) {
    this.data_di_nascita = $event;
  }

}
