import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UrlConstants } from 'src/app/_constants/url.constants';
import { Protocol } from 'src/app/_models/protocol';
import { GETService } from 'src/app/get.service';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { POSTService } from 'src/app/post.service';
import { JcrHelper } from 'src/app/_helpers/jcrhelper';
import { SchedaSlingAttributeBean } from 'src/app/_models/SchedaSlingAttributeBean';

@Component({
  selector: 'app-scheda2',
  templateUrl: './scheda2.component.html',
  styleUrls: ['./scheda2.component.css']
})
export class Scheda2Component implements OnInit {
  doValidateRequiredFields: boolean = true;
  requiredFieldNames: string[] = ["tipologia"];

  @Input()
  protocolNumberin!: string;

  dati_informativi_smartlist = "dati_informativi";
  portatore_smartlist = "portatore";
  preparazione_intestinale_smartlist = "preparazione_intestinale";

  // portatore_ddl_items: string[] = ["altro"];
  // portatore_chk_items: string[] = ["CVP", "CVC", "PM/ICD"];

  // dati_informativi_ddl_items: string[] = ["Denti che si muovono","Altro"];
  // dati_informativi_chk_items: string[] = ["Glaucoma", "Allergia", "Favismo", "Problemi Respiratori", "Problemi Cardiovascolari", "Allergia Farmaci", 
  //                                         "Allergia Cibo", "Alergia Altro", "Diabete Insulino Dipendente", "Diabete Non Insulino Dipendente"];

  // terapia_anticoagulante_ddl_items: string[] = ["altro"];
  // terapia_anticoagulante_chk_items: string[] = ["Terapia Anticoagulante", "Terapia antiaggregante", "Difetti Fattori Coag"];

  terapia_anticoagulante_smartlist_name = "terapia_anticoagulante";

  cognome!: string;
  consenso_informato!: boolean;
  data_di_nascita!: string;
  data_visita!: Date;
  esame_motivo!: string;
  nome!: string;
  note_2!: string;
  o2_terapia_l_min!: number;
  preparazione_intestinale!: string;
  protocol!: Protocol;
  stato_ansia!: string;
  stato_respiratorio!: string;
  terapia_anticoagulante_sospesa!: Date;
  tipologia!: string;
  urgenza!: boolean;
  valutazione_dolore_nrs_value!: string;
  valutazione_dolore_nrs_intervento!: string;
  selezione_sala_value!: string;

  fc_data_visita = new FormControl(new Date());
  fc_terapia_anticoagulante_sospesa_il = new FormControl(new Date());

  // preparazione_intestinale_ddl_items: string[] = ["Purgante Split","altro"];
  // preparazione_intestinale_chk_items: string[] = ["Digiuno", "Clisteri", "Irrigazione", "Purgante Completa", "Purgante Parziale"];

  statoAnsiaHeader = "Stato d'ansia";

  constructor(
    public serviceGET: GETService,
    private postService: POSTService,
    private router: Router) {
  }

  ngOnInit() {
    this.setProtocolNumber();

    this.data_visita = new Date();

    this.serviceGET.getWorkingData().subscribe(d => {
      console.log(JSON.stringify(d));

      this.cognome = JcrHelper.getJcrStringValue(d, "cognome");
      this.consenso_informato = JcrHelper.getJcrBooleanValue(d, "consenso_informato");
      this.data_di_nascita = JcrHelper.getJcrStringValue(d, "data_di_nascita");
      this.data_visita = JcrHelper.getJcrDateValue(d, "data_visita");
      this.esame_motivo = JcrHelper.getJcrStringValue(d, "esame_motivo");
      this.nome = JcrHelper.getJcrStringValue(d, "nome");
      this.note_2 = JcrHelper.getJcrStringValue(d, "note_2");
      this.o2_terapia_l_min = JcrHelper.getJcrNumberValue(d, "o2_terapia_l_min");
      this.preparazione_intestinale = JcrHelper.getJcrStringValue(d, "preparazione_intestinale");
      this.stato_ansia = JcrHelper.getJcrStringValue(d, "stato_ansia");
      this.stato_respiratorio = JcrHelper.getJcrStringValue(d, "stato_respiratorio");
      this.terapia_anticoagulante_sospesa = JcrHelper.getJcrDateValue(d, "terapia_anticoagulante_sospesa");
      this.tipologia = JcrHelper.getJcrStringValue(d, "tipologia");
      this.urgenza = JcrHelper.getJcrBooleanValue(d, "urgenza");
      this.valutazione_dolore_nrs_value = JcrHelper.getJcrStringValue(d, "valutazione_dolore_nrs_value");
      this.valutazione_dolore_nrs_intervento = JcrHelper.getJcrStringValue(d, "valutazione_dolore_nrs_intervento");

      this.selezione_sala_value = JcrHelper.getJcrStringValue(d, "selezione_sala_value");
      this.fc_data_visita.setValue(this.data_visita);
      this.fc_terapia_anticoagulante_sospesa_il.setValue(this.terapia_anticoagulante_sospesa);
    }, error => {
      console.error(error);
    });
  }

  setProtocolNumber() {
    try {
      this.protocol = new Protocol(this.serviceGET, this.postService);
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

  onChangeRf($event : any) {
    console.log($event);
    let fieldName: string = $event.source.name;
    let fieldvalue: string = $event.source.value;
    this.postAttribute(fieldName, fieldvalue);
  }

  postAttribute(fieldId: string, fieldValue: string) {
    this.postService.postSlingNodeAttribute(new SchedaSlingAttributeBean(fieldId, fieldValue, "String", false, false, false))
      .subscribe(resp => {
        console.log(resp);
      },
        error => console.log(error)
      );
  }

  txtO2TerapiaOnChange() {
    console.log(this.o2_terapia_l_min);
    this.postAttribute("o2_terapia_l_min", `${this.o2_terapia_l_min}`);
  }

  formatDate_yyyyMMdd(date: Date) {
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
    }
    else {
      console.error("MatDatepickerInputEvent.value was undefined");
    }
  }

  validate(): string[] {
    let errorMessages: string[] = [];
    if (this.isRequired("tipologia") && (this.tipologia === null || this.tipologia === undefined || this.tipologia == '')) {
      errorMessages.push("Valorizzare la tipologia");
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
          this.router.navigate([UrlConstants._3_INTRA_PROCEDURA]);
        } else {
          swal.fire("Attenzione",errorMessages.join('<br/>'), "error");
          //alert(errorMessages.join('\n'))
        }
        return;
      case NavbarComponent.REQUEST_PREVIOUS:
          this.router.navigate([UrlConstants._1_ACCOGLIENZA]);
        return;
    }
  }

}
